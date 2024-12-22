import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const npmInstallSkill = getInjectable({
  id: "npm-install",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "npm-install",
      parse: JSON.parse,
      function: async (input) => {
        const { exec } = await import('child_process');
        const installType = input.global ? "-g" : ""; // Determine if the installation is global or local
        return new Promise((resolve, reject) => {
          exec(`npm install ${installType} ${input.packageName}`, (error, stdout, stderr) => {
            if (error) {
              reject(`Error: ${stderr}`);
              return;
            }
            resolve(stdout);
          });
        });
      },
      description: "This skill installs a given npm package, globally or locally based on input.",
      parameters: {
        type: "object",
        properties: {
          packageName: {
            type: "string",
            description: "The name of the npm package to install."
          },
          global: {
            type: "boolean",
            description: "Whether to install the package globally. Default is local installation.",
            default: false
          }
        },
        required: ["packageName"]
      },
    },
  }),

  injectionToken: skillInjectionToken,
});