import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
import { exec } from "child_process";

const { getInjectable } = injectable;

export const commitMultipleFiles = getInjectable({
  id: "commit-multiple-files",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "commit-multiple-files",
      parse: JSON.parse,
      function: async ({ files, message }) => {
        return new Promise((resolve, reject) => {
          const fileList = files.join(' ');
          exec(`git add ${fileList} && git commit -m "${message}"`, (error, stdout, stderr) => {
            if (error) {
              reject(`exec error: ${error}`);
              return;
            }
            if (stderr) {
              reject(`stderr: ${stderr}`);
              return;
            }
            resolve(stdout.trim());
          });
        });
      },
      description: "Commits specified files and directories into the repository with a given commit message.",
      parameters: {
        type: "object",
        properties: {
          files: {
            type: "array",
            items: {
              type: "string",
            },
            description: "An array of file or directory paths to commit.",
          },
          message: {
            type: "string",
            description: "The commit message to use.",
          },
        },
        required: ["files", "message"],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
