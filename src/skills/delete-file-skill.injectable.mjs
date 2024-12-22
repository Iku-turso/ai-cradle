import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
import fs from 'fs/promises';
const { getInjectable } = injectable;

export const deleteFileSkill = getInjectable({
  id: "delete-file-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "deleteFile",
      parse: JSON.parse,
      function: async (input) => {
        // Validate input parameter
        if (!input.filePath) {
          throw new Error("File path is required to delete a file.");
        }

        try {
          await fs.unlink(input.filePath);
          return `File at ${input.filePath} was successfully deleted.`;
        } catch (error) {
          throw new Error(`Failed to delete file at ${input.filePath}: ${error.message}`);
        }
      },
      description: "Deletes a file at the specified file path.",
      parameters: {
        type: "object",
        properties: {
          filePath: {
            type: "string",
            description: "The path to the file to be deleted."
          }
        },
        required: ["filePath"],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});