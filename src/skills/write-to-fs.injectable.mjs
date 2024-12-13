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
        function: async (input) => {
          const parsedInput = JSON.parse(input);
          console.log(123123, parsedInput);

          fs.writeFileSync(
            path.join("example.txt"),
            parsedInput.fileContent.toString(),
          );
        },

        description: "Write a file to file-system",

        parameters: {
          type: "object",

          properties: {
            fileContent: { type: "string" },
            // fileName: { type: "string" },
          },
        },
      },
    };
  },

  injectionToken: skillInjectionToken,
});
