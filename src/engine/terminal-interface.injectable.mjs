import readline from "readline";
import injectable from "@ogre-tools/injectable";
const { getInjectable } = injectable;

export const terminalInterfaceInjectable = getInjectable({
  id: "terminal-interface",

  instantiate: () =>
    readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    }),
});
