import fs from "fs/promises";
import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const listDirectoryContents = getInjectable({
  id: "list-directory-contents",

  instantiate: (di) => ({
    type: "function",

    function: {
      function: async (input) => {
        const directoryPath = input.directoryPath;

        try {
          const files = await fs.readdir(directoryPath);
          return files;
        } catch (err) {
          throw err;
        }
      },
      description: "Lists the contents of a specified directory",
      parameters: {
        type: "object",
        properties: {
          directoryPath: {
            type: "string",
            description: "The path of the directory to list contents from",
          },
        },
        required: ["directoryPath"],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
