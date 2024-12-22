import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const npmGlobalInstallSkill = getInjectable({
  id: "npm-global-install",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "npm-global-install",
      parse: JSON.parse,
      function: async (input) => {
        const { exec } = await import('child_process');
        return new Promise((resolve, reject) => {
          exec(`npm install -g ${input.packageName}`, (error, stdout, stderr) => {
            if (error) {
              reject(`Error: ${stderr}`);
              return;
            }
            resolve(stdout);
          });
        });
      },
      description: "This skill installs a given npm package globally.",
      parameters: {
        type: "object",
        properties: {
          packageName: {
            type: "string",
            description: "The name of the npm package to install globally."
          }
        },
        required: ["packageName"]
      },
    },
  }),

  injectionToken: skillInjectionToken,
});