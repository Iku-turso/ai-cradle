import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const npmInstallOnSaveSkill = getInjectable({
  id: "npm-install-on-save-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "determine-if-npm-install-is-required",
      parse: JSON.parse,
      function: () => "Yes",

      description:
        "Determine if `npm install` is required after saving a .mjs file to fs",

      parameters: {
        type: "object",
        properties: {
          directory: {
            type: "string",
            description: "The directory to monitor for `.mjs` file saves.",
            default: process.cwd(),
          },
        },
        required: [],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
