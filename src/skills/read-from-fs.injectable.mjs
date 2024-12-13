import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skillInjectionToken.mjs";
import fs from "fs";

const { getInjectable } = injectable;

const readFromFs = getInjectable({
  id: "read-from-fs",

  instantiate: (di) => {
    return {
      type: "function",

      function: {
        function: async (input) => {
          const parsedInput = JSON.parse(input);

          return fs.readFileSync(parsedInput.filePath, "utf8");
        },

        description: "Read a file from file-system",

        parameters: {
          type: "object",

          properties: {
            filePath: { type: "string" },
          },
        },
      },
    };
  },

  injectionToken: skillInjectionToken,
});
