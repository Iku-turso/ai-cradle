import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
import { exec } from "child_process";
const { getInjectable } = injectable;

export const gitCommitSkill = getInjectable({
  id: "git-commit-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "makeGitCommit",
      parse: JSON.parse,
      function: async (input) => {
        if (!input.message) {
          throw new Error("Commit message is required.");
        }

        const commitCommand = `git commit -m "${input.message}"`;

        return new Promise((resolve, reject) => {
          exec(commitCommand, (error, stdout, stderr) => {
            if (error) {
              reject(`Commit failed: ${stderr}`);
            } else {
              resolve(`Commit successful: ${stdout}`);
            }
          });
        });
      },
      description: "Makes a git commit with the provided message.",
      parameters: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "The commit message for the git commit."
          }
        },
        required: ["message"],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});