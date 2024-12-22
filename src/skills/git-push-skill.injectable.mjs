import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
import { exec } from "child_process";
const { getInjectable } = injectable;

export const gitPushSkill = getInjectable({
  id: "git-push-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "pushToGit",
      parse: JSON.parse,
      function: async (input) => {
        const command = "git push";

        return new Promise((resolve, reject) => {
          exec(command, (error, stdout, stderr) => {
            if (error) {
              reject(`Error pushing to Git: ${stderr}`);
            } else {
              resolve(`Push successful: ${stdout}`);
            }
          });
        });
      },
      description: "Pushes the committed changes to the remote Git repository.",
      parameters: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
    },
  }),

  injectionToken: skillInjectionToken,
});