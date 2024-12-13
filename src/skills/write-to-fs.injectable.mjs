import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skillInjectionToken.mjs";
import fs from "fs";
import path from "path";

const { getInjectable } = injectable;

export const writeToFs = getInjectable({
  id: "write-to-fs",

  instantiate: (di) => {
    return {
      type: "function",

      function: {
        name: "write-to-fs",

        parse: JSON.parse,

        function: async (input) => {
          fs.writeFileSync(
            path.join(input.fileName),
            input.fileContent.toString(),
          );
        },

        description: "Write a file to a deducted filename",

        parameters: {
          type: "object",

          properties: {
            fileContent: { type: "string" },
            fileName: { type: "string" },
          },
        },
      },
    };
  },

  injectionToken: skillInjectionToken,
});
