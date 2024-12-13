import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skillInjectionToken.mjs";
import fs from "fs";

const { getInjectable } = injectable;

export const readFromFs = getInjectable({
  id: "read-from-fs",

  instantiate: (di) => {
    return {
      type: "function",
      function: {
        name: "read-from-fs",
        parse: JSON.parse,
        function: async (input) => fs.readFileSync(input.filePath, "utf8"),
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
