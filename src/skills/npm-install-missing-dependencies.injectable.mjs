import injectable from "@ogre-tools/injectable";
import { skillInjectionToken } from "../engine/skill-injection-token.mjs";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { builtinModules } from "module";

const { getInjectable } = injectable;

export const npmInstallMissingDependencies = getInjectable({
  id: "npm-install-missing-dependencies",

  instantiate: (di) => ({
    type: "function",

    function: {
      name: "npm-install-missing-dependencies",
      parse: JSON.parse,
      function: async () => {
        const skillsDirectory = path.resolve("src", "skills");
        const packageJsonPath = path.resolve("package.json");

        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf8"),
        );
        const dependencies = packageJson.dependencies || {};

        const files = fs.readdirSync(skillsDirectory);
        const skillFiles = files.filter((file) =>
          file.endsWith(".injectable.mjs"),
        );

        const importedModules = new Set();

        for (const file of skillFiles) {
          const content = fs.readFileSync(
            path.join(skillsDirectory, file),
            "utf8",
          );
          const importRegex = /import\s+[^'"\n]+from\s+['"]([^'"\n]+)['"]/g;

          let match;
          while ((match = importRegex.exec(content)) !== null) {
            const moduleName = match[1];
            // Consider only non-relative imports and non-native modules as potential npm packages
            if (!moduleName.startsWith(".") && !builtinModules.includes(moduleName)) {
              importedModules.add(moduleName);
            }
          }
        }

        const missingDependencies = Array.from(importedModules).filter(
          (module) => !(module in dependencies),
        );

        if (missingDependencies.length > 0) {
          console.log(
            `Missing dependencies found: ${missingDependencies.join(", ")}`,
          );
          console.log("Installing missing dependencies...");

          try {
            execSync(`npm install ${missingDependencies.join(" ")}`, {
              stdio: "inherit",
            });
            console.log("Missing dependencies installed successfully.");
            return { installedDependencies: missingDependencies };
          } catch (error) {
            console.error("Failed to install missing dependencies.", error);
            throw error;
          }
        } else {
          console.log("No missing dependencies to install.");
          return { installedDependencies: [] };
        }
      },

      description:
        "Install npm dependencies that are imported in AI-skills but missing from package.json, and return the names of installed dependencies.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  }),

  injectionToken: skillInjectionToken,
});
