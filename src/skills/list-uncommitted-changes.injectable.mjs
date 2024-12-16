import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
import { exec } from "child_process";

const { getInjectable } = injectable;

export const listUncommittedChanges = getInjectable({
  id: "list-uncommitted-changes",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "list-uncommitted-changes",
      parse: JSON.parse,
      function: async () => {
        return new Promise((resolve, reject) => {
          exec('git status --porcelain', (error, stdout, stderr) => {
            if (error) {
              reject(`exec error: ${error}`);
              return;
            }
            if (stderr) {
              reject(`stderr: ${stderr}`);
              return;
            }
            if (stdout === '') {
              resolve('No uncommitted changes.');
            } else {
              resolve(stdout.trim().split('\n'));
            }
          });
        });
      },
      description: "Lists uncommitted changes in the current Git repository.",
      parameters: {},
    },
  }),

  injectionToken: skillInjectionToken,
});
