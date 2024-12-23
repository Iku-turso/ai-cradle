import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
import fs from "fs";
import path from "path";

const { getInjectable } = injectable;

export const writeToFs = getInjectable({
  id: "write-to-fs",

  instantiate: () => ({
    type: "function",

    function: {
      name: "write-to-fs",
      description:
        "Write a file to a deducted filename (in kebab-case). If it's a .js-file, use .mjs instead. If it's an AI-skill, write it to /src/skills.",

      parse: JSON.parse,

      function: (input) => {
        fs.writeFileSync(input.fileName, input.fileContent.toString());
      },

      parameters: {
        type: "object",

        properties: {
          fileContent: { type: "string" },
          fileName: { type: "string" },
        },
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
