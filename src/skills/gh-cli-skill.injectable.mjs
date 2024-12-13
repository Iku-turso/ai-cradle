import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";

// This is where the implementation for executing gh-cli commands goes.
// Use a suitable method such as executing shell commands from Node.js.
import { execSync } from "child_process";

const { getInjectable } = injectable;

// gh-cli-skill for interfacing with GitHub CLI commands
export const ghCliSkill = getInjectable({
  id: "gh-cli-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "executeGhCliCommand",
      parse: JSON.parse,

      function: (input) => {
        const command = `gh ${input.command}`;

        return execSync(command, {
          env: process.env,
          encoding: "utf8",
        });
      },

      description: "Executes a command using the GitHub CLI.",
      parameters: {
        type: "object",
        properties: {
          command: {
            type: "string",
            description:
              "The arguments of GitHub CLI command to execute, eg. what comes after 'gh'.",
          },
        },
        required: ["command"],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
