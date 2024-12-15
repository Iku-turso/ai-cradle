import path from "path";
import chokidar from "chokidar";
import injectable from "@ogre-tools/injectable";
import ogreToolsFp from "@ogre-tools/fp";
import { createRequire } from "module";
import { pathToFileURL } from "url";

const require = createRequire(import.meta.url);
const lodashFp = require("lodash/fp");

const { pipeline } = ogreToolsFp;
const { values, filter, spread } = lodashFp;
const { getInjectable, isInjectable } = injectable;

const withFileUrl = (toBeDecorated) => (filePath) => {
  const filePathIsFileUrlAlready = filePath.startsWith("file://");

  if (filePathIsFileUrlAlready) {
    return toBeDecorated(filePath);
  }

  return toBeDecorated(pathToFileURL(filePath).href);
};

export const diRegistrationWatcherInjectable = getInjectable({
  id: "di-registration-watcher",

  instantiate: (di) => {
    const injectablesByPath = new Map();
    const register = withFileUrl(registerFor(di, injectablesByPath));
    const deregister = withFileUrl(deregisterFor(di, injectablesByPath));
    const reregister = withFileUrl(reregisterFor(deregister, register));

    return {
      start: async () => {
        const initialRegistrations = new Set();
        let watcherHasStarted = false;

        const modulePath = path.resolve("src", "skills");

        const watcher = chokidar.watch(modulePath, {
          persistent: true,
          depth: 99,
          ignoreInitial: false,
        });

        await new Promise((resolveStart) => {
          watcher
            .on("unlink", deregister)
            .on("add", (path) => {
              const registration = register(path);

              if (!watcherHasStarted) {
                initialRegistrations.add(registration);
              }
            })
            .on("change", reregister)
            .on("rename", (path) => {
              throw new Error("Renames of files are not supported yet");
            })
            .on("error", (error) => console.error(`Watcher error: ${error}`))
            .on("ready", async () => {
              await Promise.all(initialRegistrations);

              initialRegistrations.clear();

              watcherHasStarted = true;

              resolveStart();
            });
        });
      },
    };
  },
});

const registerFor = (di, injectablesByPath) => async (fileUrl) => {
  if (!fileUrl.endsWith(".injectable.mjs")) {
    return;
  }

  try {
    await pipeline(
      await import(`${fileUrl}?${Math.random()}`),
      values,
      filter(isInjectable),
      (injectables) => {
        di.register(...injectables);
        injectablesByPath.set(fileUrl, injectables);

        // console.log(
        //   "Skills registered:",
        //   injectables.map((x) => `"${x.id}"`).join(", "),
        // );
      },
    );
  } catch (e) {
    console.error(`Error while registering "${fileUrl}"`, e);
  }
};

const deregisterFor = (di, injectablesByPath) => (fileUrl) => {
  if (!fileUrl.endsWith(".injectable.mjs")) {
    return;
  }

  pipeline(injectablesByPath.get(fileUrl), (injectables) => {
    if (injectables) {
      di.deregister(...injectables);
    }

    // console.log(
    //   "Skills deregistered:",
    //   injectables.map((x) => `"${x.id}"`).join(", "),
    // );
  });

  injectablesByPath.delete(fileUrl);
};

const reregisterFor = (deregister, register) => async (fileUrl) => {
  deregister(fileUrl);

  await register(fileUrl);
};
