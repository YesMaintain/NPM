var Node_default = async () => await (async (Files) => {
  for (const { Path, Name, File } of Files) {
    for (const [_Directory, FilesPackage] of await (await import("../Function/Directory.js")).default(
      await (await import("../Function/Package.js")).default("NPM")
    )) {
      const GitHub = `${_Directory}/.github`;
      const Base = await File();
      if (Path === "/workflows/" && Name === "Node.yml") {
        for (const Package of FilesPackage) {
          const Directory = (await import("node:path")).dirname(Package).replace(_Directory, "");
          const FilePackage = (await (await import("node:fs/promises")).readFile(Package, "utf-8")).toString();
          const Environment = (await (await import("../Function/Type.js")).default()).get(Package.split("/").pop());
          if (typeof Environment !== "undefined" && Environment === "NPM") {
            const JSONPackage = JSON.parse(FilePackage);
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
              if (typeof JSONPackage[bundle] !== "undefined") {
                Base.add(`
            - uses: actions/setup-node@v4.0.1
              with:
                  node-version: \${{ matrix.node-version }}
                  cache: "pnpm"
                  cache-dependency-path: .${Directory}/pnpm-lock.yaml

            - run: pnpm install
              working-directory: .${Directory}
`);
              }
            }
            for (const key in JSONPackage) {
              if (Object.prototype.hasOwnProperty.call(
                JSONPackage,
                key
              )) {
                const values = JSONPackage[key];
                if (key === "scripts") {
                  for (const scripts in values) {
                    if (Object.prototype.hasOwnProperty.call(
                      values,
                      scripts
                    )) {
                      if (scripts === "build") {
                        Base.add(`
            - run: pnpm run build
              working-directory: .

            - uses: actions/upload-artifact@v4.1.0
              with:
                  name: .${Directory.replaceAll("/", "-")}-Node-\${{ matrix.node-version }}-Target
                  path: .${Directory}/Target
`);
                      }
                      if (scripts === "prepublishOnly") {
                        Base.add(`
            - run: pnpm run prepublishOnly
              working-directory: .

            - uses: actions/upload-artifact@v4.1.0
              with:
                  name: .${Directory.replaceAll("/", "-")}-Node-\${{ matrix.node-version }}-Target
                  path: .${Directory}/Target
`);
                      }
                      if (scripts === "test") {
                        Base.add(`
            - run: pnpm run test
              working-directory: .${Directory}
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
      if (Base.size > 1) {
        try {
          await (await import("node:fs/promises")).mkdir(
            `${GitHub}${Path}`,
            {
              recursive: true
            }
          );
        } catch {
          console.log(`Could not create: ${GitHub}${Path}`);
        }
        try {
          await (await import("node:fs/promises")).writeFile(
            `${GitHub}${Path}${Name}`,
            `${[...Base].join("")}`
          );
        } catch {
          console.log(
            `Could not create workflow for: ${GitHub}/workflows/Node.yml`
          );
        }
      }
    }
  }
})((await import("../Variable/Node.js")).default);
export {
  Node_default as default
};
