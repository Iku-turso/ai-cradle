import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";

const { getInjectable } = injectable;

// gh-cli-skill for interfacing with GitHub CLI commands
export const ghCliSkill = getInjectable({
  id: "gh-cli-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "executeGhCliCommand",
      parse: JSON.parse,
      
      function: async (input) => {
        // This is where the implementation for executing gh-cli commands goes.
        // Use a suitable method such as executing shell commands from Node.js.
        const { execSync } = require('child_process');
        
        try {
          const commandOutput = execSync(`gh ${input.command}`, { encoding: 'utf8' });
          return { success: true, output: commandOutput };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },

      description: "Executes a command using the GitHub CLI.",
      parameters: {
        type: "object",
        properties: {
          command: {
            type: "string",
            description: "The GitHub CLI command to execute."
          },
        },
        required: ["command"],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
