import Directory from "../Library/Directory.js";
import Package from "../Library/Package.js";
import Type from "../Library/Type.js";
import Node from "../Option/Node.js";
import { constants as Constant } from "fs";
import { access, mkdir, readFile, rm, writeFile } from "fs/promises";
import { dirname as Dir } from "path";
const Workflow = async (files) => {
  for (const { Path, Name, File } of files) {
    for (const [directory, packageFiles] of await Directory(
      await Package("NPM")
    )) {
      const githubDir = `${directory}/.github`;
      const workflowBase = await File();
      if (Path === "/workflows/" && Name === "Node.yml") {
        for (const _package of packageFiles) {
          const packageDirectory = Dir(_package).replace(
            directory,
            ""
          );
          const packageFile = (await readFile(_package, "utf-8")).toString();
          const environment = (await Type()).get(
            _package.split("/").pop()
          );
          if (typeof environment !== "undefined" && environment === "NPM") {
            const packageJSON = JSON.parse(packageFile);
            for (const bundle of [
              "bundledDependencies",
              "bundleDependencies",
              "dependencies",
              "devDependencies",
              "extensionDependencies",
              "optionalDependencies",
              "peerDependencies",
              "peerDependenciesMeta"
            ].sort()) {
              if (typeof packageJSON[bundle] !== "undefined") {
                workflowBase.add(`
            - uses: actions/setup-node@v3.8.1
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${packageDirectory}/pnpm-lock.yaml

            - run: pnpm install
              working-directory: .${packageDirectory}
`);
              }
            }
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
                      if (scripts === "build") {
                        workflowBase.add(`
            - run: pnpm run build
              working-directory: .

            - uses: actions/upload-artifact@v3.1.3
              with:
                  name: .${packageDirectory.replaceAll(
                          "/",
                          "-"
                        )}-Node-\${{ matrix.node-version }}-Target
                  path: .${packageDirectory}/Target
`);
                      }
                      if (scripts === "prepublishOnly") {
                        workflowBase.add(`
            - run: pnpm run prepublishOnly
              working-directory: .

            - uses: actions/upload-artifact@v3.1.3
              with:
                  name: .${packageDirectory.replaceAll(
                          "/",
                          "-"
                        )}-Node-\${{ matrix.node-version }}-Target
                  path: .${packageDirectory}/Target
`);
                      }
                      if (scripts === "test") {
                        workflowBase.add(`
            - run: pnpm run test
              working-directory: .${packageDirectory}
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
          await mkdir(`${githubDir}${Path}`, {
            recursive: true
          });
        } catch {
          console.log(`Could not create: ${githubDir}${Path}`);
        }
        try {
          await writeFile(
            `${githubDir}${Path}${Name}`,
            `${[...workflowBase].join("")}`
          );
        } catch {
          console.log(
            `Could not create workflow for: ${githubDir}/workflows/Node.yml`
          );
        }
      } else {
        try {
          await access(`${githubDir}${Path}${Name}`, Constant.F_OK);
          try {
            await rm(`${githubDir}${Path}${Name}`);
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
var Node_default = async () => await Workflow(Node);
export {
  Node_default as default
};
