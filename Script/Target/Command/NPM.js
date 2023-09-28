import Directory from "../Library/Directory.js";
import Package from "../Library/Package.js";
import Type from "../Library/Type.js";
import NPM from "../Option/NPM.js";
import { constants as Constant } from "fs";
import {
  access as Access,
  mkdir as Dir,
  rm as Remove,
  readFile as _File,
  writeFile as __File
} from "fs/promises";
import { dirname } from "path";
const Workflow = async (Files) => {
  for (const { Path, Name, File } of Files) {
    for (const [directory, packageFiles] of await Directory(
      await Package("NPM")
    )) {
      const githubDir = `${directory}/.github`;
      const workflowBase = await File();
      if (Path === "/workflows/" && Name === "NPM.yml") {
        for (const _package of packageFiles) {
          const packageDirectory = dirname(_package).replace(
            directory,
            ""
          );
          const packageFile = (await _File(_package, "utf-8")).toString();
          const environment = (await Type()).get(
            _package.split("/").pop()
          );
          if (typeof environment !== "undefined" && environment === "NPM") {
            const packageJSON = JSON.parse(packageFile);
            for (const key in packageJSON) {
              if (Object.prototype.hasOwnProperty.call(
                packageJSON,
                key
              )) {
                const values = packageJSON[key];
                if (key === "scripts") {
                  for (const scripts in values) {
                    if (Object.prototype.hasOwnProperty.call(
                      values,
                      scripts
                    )) {
                      if (scripts === "prepublishOnly") {
                        workflowBase.add(`
            - name: Publish .${packageDirectory}
              continue-on-error: true
              working-directory: .${packageDirectory}
              run: |
                  npm install --legacy-peer-deps
                  npm publish --legacy-peer-deps --provenance
              env:
                  NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
`);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (workflowBase.size > 1) {
        try {
          await Dir(`${githubDir}${Path}`, {
            recursive: true
          });
        } catch {
          console.log(`Could not create: ${githubDir}${Path}`);
        }
        try {
          await __File(
            `${githubDir}${Path}${Name}`,
            `${[...workflowBase].join("")}`
          );
        } catch {
          console.log(
            `Could not create workflow for: ${githubDir}/workflows/NPM.yml`
          );
        }
      } else {
        try {
          await Access(`${githubDir}${Path}${Name}`, Constant.F_OK);
          try {
            await Remove(`${githubDir}${Path}${Name}`);
          } catch {
            console.log(
              `Could not remove ${Path}${Name} for: ${githubDir}`
            );
          }
        } catch {
        }
      }
    }
  }
};
var NPM_default = async () => await Workflow(NPM);
export {
  NPM_default as default
};
