var NPM_default = async () => await (async (Files) => {
  for (const { Path, Name, File } of Files) {
    for (const [directory, packageFiles] of await (await import("../Function/Directory.js")).default(
      await (await import("../Function/Package.js")).default("NPM")
    )) {
      const githubDir = `${directory}/.github`;
      const workflowBase = await File();
      if (Path === "/workflows/" && Name === "NPM.yml") {
        for (const _package of packageFiles) {
          const packageDirectory = (await import("path")).dirname(_package).replace(directory, "");
          const packageFile = (await (await import("fs/promises")).readFile(_package, "utf-8")).toString();
          const environment = (await (await import("../Function/Type.js")).default()).get(_package.split("/").pop());
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
          await (await import("fs/promises")).mkdir(`${githubDir}${Path}`, {
            recursive: true
          });
        } catch {
          console.log(`Could not create: ${githubDir}${Path}`);
        }
        try {
          await (await import("fs/promises")).writeFile(
            `${githubDir}${Path}${Name}`,
            `${[...workflowBase].join("")}`
          );
        } catch {
          console.log(
            `Could not create workflow for: ${githubDir}/workflows/NPM.yml`
          );
        }
      }
    }
  }
})((await import("../Variable/NPM.js")).default);
export {
  NPM_default as default
};
