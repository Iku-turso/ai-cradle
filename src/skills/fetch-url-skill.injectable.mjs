import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const fetchUrlSkill = getInjectable({
  id: "fetch-url-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "fetchUrl",
      parse: JSON.parse,
      function: async ({ url }) => {
        // Implement fetching logic here
        const response = await fetch(url);
        const data = await response.text();
        return data;
      },
      description: "Fetches the content from a specified URL",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "The URL to fetch data from",
          },
        },
        required: ["url"],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});