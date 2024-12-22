import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
const { getInjectable } = injectable;

export const listAllCommitsSkill = getInjectable({
  id: "list-all-commits",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "listAllCommits",
      parse: JSON.parse,
      async function() {
        const { exec } = await import('child_process');
        const { promisify } = await import('util');
        const execAsync = promisify(exec);

        try {
          const { stdout } = await execAsync('git log --oneline');
          return stdout.split('\n').filter(Boolean);
        } catch (error) {
          console.error("Error listing commits:", error);
          return [];
        }
      },
      description: "Lists all commits in the current Git repository.",
      parameters: {},
    },
  }),

  injectionToken: skillInjectionToken,
});