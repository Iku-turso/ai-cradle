import path from "path";
import chokidar from "chokidar";
import injectable from "@ogre-tools/injectable";
import ogreToolsFp from "@ogre-tools/fp";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const lodashFp = require("lodash/fp");

const { pipeline } = ogreToolsFp;
const { values, filter, spread } = lodashFp;
const { getInjectable, isInjectable } = injectable;

export const diRegistrationWatcherInjectable = getInjectable({
  id: "di-registration-watcher",

  instantiate: (di) => {
    const injectablesByPath = new Map();
    const register = registerFor(di, injectablesByPath);
    const deregister = deregisterFor(di, injectablesByPath);
    const reregister = reregisterFor(deregister, register);

    return {
      start: () => {
        const directoryToWatch = path.resolve("src", "skills");

        const watcher = chokidar.watch(directoryToWatch, {
          persistent: true,
          depth: 99,
          ignoreInitial: false,
        });

        watcher
          .on("unlink", deregister)
          .on("add", register)
          .on("change", reregister)
          .on("rename", (path) => {
            throw new Error("Renames of files are not supported yet");
          })
          .on("error", (error) => console.error(`Watcher error: ${error}`));
      },
    };
  },
});

const registerFor = (di, injectablesByPath) => async (filePath) => {
  if (!filePath.endsWith(".injectable.mjs")) {
    return;
  }

  try {
    await pipeline(
      await import(`${filePath}?${Math.random()}`),
      values,
      filter(isInjectable),
      (injectables) => {
        di.register(...injectables);
        injectablesByPath.set(filePath, injectables);

        // console.log(
        //   "Skills registered:",
        //   injectables.map((x) => `"${x.id}"`).join(", "),
        // );
      },
    );
  } catch (e) {
    console.error("error while registering", e);
  }
};

const deregisterFor = (di, injectablesByPath) => (filePath) => {
  if (!filePath.endsWith(".injectable.mjs")) {
    return;
  }

  pipeline(injectablesByPath.get(filePath), (injectables) => {
    if (injectables) {
      di.deregister(...injectables);
    }

    // console.log(
    //   "Skills deregistered:",
    //   injectables.map((x) => `"${x.id}"`).join(", "),
    // );
  });

  injectablesByPath.delete(filePath);
};

const reregisterFor = (deregister, register) => async (filePath) => {
  deregister(filePath);

  await register(filePath);
};
