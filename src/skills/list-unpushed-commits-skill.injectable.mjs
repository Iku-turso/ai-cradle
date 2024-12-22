import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
import { exec } from "child_process";
const { getInjectable } = injectable;

export const listUnpushedCommitsSkill = getInjectable({
  id: "list-unpushed-commits-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "listUnpushedCommits",
      parse: JSON.parse,
      function: async () => {
        const command = "git log origin/main..HEAD --oneline";

        return new Promise((resolve, reject) => {
          exec(command, (error, stdout, stderr) => {
            if (error) {
              reject(`Error listing unpushed commits: ${stderr}`);
            } else {
              resolve(stdout ? stdout.trim() : "No unpushed commits found.");
            }
          });
        });
      },
      description: "Lists the commits in the current branch that haven't been pushed to the remote repository.",
      parameters: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
    },
  }),

  injectionToken: skillInjectionToken,
});