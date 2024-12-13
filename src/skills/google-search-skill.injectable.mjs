import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const googleSearchSkill = getInjectable({
 id: "google-search-skill",

 instantiate: (di) => ({
   type: "function",

   function: {
     name: "googleSearch",
     parse: JSON.parse,
     function: async (input) => {
       // Check if the skill has a valid query string
       if (!input || typeof input.query !== "string" || input.query.trim() === "") {
         throw new Error("A valid query string must be provided.");
       }

       // Construct Google Search URL
       const query = encodeURIComponent(input.query);
       const url = `https://www.google.com/search?q=${query}`;

       // Fetch results from Google (use a library like `node-fetch` for actual requests)
       let response;
       try {
         response = await fetch(url, { method: 'GET' });
       } catch (error) {
         throw new Error(`Failed to fetch results: ${error.message}`);
       }

       // Check if response is OK (status code 200)
       if (!response.ok) {
         throw new Error(`Unsuccessful request with status ${response.status}`);
       }

       // Return the response body as text
       const result = await response.text();
       return { html: result };
     },
     description: "Search Google and return the HTML result of the search page.",
     parameters: {
       type: "object",
       properties: {
         query: {
           type: "string",
           description: "The search query to be sent to Google.",
         },
       },
       required: ["query"],
     },
   },
 }),

 injectionToken: skillInjectionToken,
});
