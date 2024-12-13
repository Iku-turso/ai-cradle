import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const npmInstallSkill = getInjectable({
  id: "npm-install-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "run-npm-install",
      parse: JSON.parse,
      function: (input) => {
        // Logic to run `npm install` in the specified directory.
        const exec = require('child_process').exec;
        const directory = input.directory || process.cwd();

        exec('npm install', { cwd: directory }, (err, stdout, stderr) => {
          if (err) {
            return { success: false, error: stderr };
          }
          return { success: true, output: stdout };
        });
      },
      description: "Runs `npm install` in the specified directory.",
      parameters: {
        type: "object",
        properties: {
          directory: {
            type: "string",
            description: "The directory where npm install should be run.",
            default: process.cwd()
          }
        },
        required: [],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});