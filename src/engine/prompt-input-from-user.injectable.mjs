import { terminalInterfaceInjectable } from "./terminal-interface.injectable.mjs";
import injectable from "@ogre-tools/injectable";
const { getInjectable } = injectable;

export const promptInputFromUserInjectable = getInjectable({
  id: "prompt-input-from-user",

  instantiate: (di) => {
    const terminal = di.inject(terminalInterfaceInjectable);

    return () =>
      new Promise((resolve) => {
        terminal.question("User > ", (answer) => {
          resolve(answer);
        });
      });
  },
});
