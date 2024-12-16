import fs from 'fs/promises';
import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const deleteFileSkill = getInjectable({
  id: "delete-file",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "deleteFile",
      description: "Deletes a specified file from the filesystem.",
      parse: JSON.parse,
      function: async (input) => {
        const { filePath } = input;

        try {
          await fs.unlink(filePath);
          return `File at ${filePath} was successfully deleted.`;
        } catch (error) {
          return `Error deleting file at ${filePath}: ${error.message}`;
        }
      },
      parameters: {
        type: "object",
        properties: {
          filePath: {
            type: "string",
            description: "The path to the file that should be deleted.",
          },
        },
        required: ["filePath"],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
