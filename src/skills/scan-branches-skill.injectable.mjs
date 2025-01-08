import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
import { execSync } from 'child_process';

const { getInjectable } = injectable;

export const scanBranchesSkill = getInjectable({
  id: "scan-branches-skill",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "scan-branches",
      parse: JSON.parse,
      function: () => {
        try {
          const branches = execSync("git branch").toString().split("\n");
          const currentBranch = branches.find(branch => branch.startsWith('*'));
          return {
            branches: branches.map(branch => branch.trim()).filter(branch => branch),
            currentActive: currentBranch ? currentBranch.replace('* ', '') : null,
          };
        } catch (error) {
          return {
            error: "Could not retrieve branches. Ensure you are in a valid git repository."
          };
        }
      },
      description: "Scans all Git branches and tells which one is currently active.",
      parameters: {},
    },
  }),

  injectionToken: skillInjectionToken,
});
