import injectable from "@ogre-tools/injectable";
import path from "path";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const findAiSkillsDirectory = getInjectable({
  id: "find-ai-skills-directory",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "find-ai-skills-directory",
      parser: JSON.parse,
      function: () => path.join("src", "skills"),
      description: "Returns the directory where AI skills are stored.",

      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
