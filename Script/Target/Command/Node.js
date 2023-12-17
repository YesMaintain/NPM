var Node_default = async () =>
	await (async (Files) => {
		for (const { Path, Name, File } of Files) {
			for (const [directory, packageFiles] of await (
				await import("../Function/Directory.js")
			).default(
				await (await import("../Function/Package.js")).default("NPM"),
			)) {
				const githubDir = `${directory}/.github`;
				const workflowBase = await File();
				if (Path === "/workflows/" && Name === "Node.yml") {
					for (const _package of packageFiles) {
						const packageDirectory = (await import("path"))
							.dirname(_package)
							.replace(directory, "");
						const packageFile = (
							await (
								await import("fs/promises")
							).readFile(_package, "utf-8")
						).toString();
						const environment = (
							await (
								await import("../Function/Type.js")
							).default()
						).get(_package.split("/").pop());
						if (
							typeof environment !== "undefined" &&
							environment === "NPM"
						) {
							const packageJSON = JSON.parse(packageFile);
							for (const bundle of [
								"bundledDependencies",
								"bundleDependencies",
								"dependencies",
								"devDependencies",
								"extensionDependencies",
								"optionalDependencies",
								"peerDependencies",
								"peerDependenciesMeta",
							].sort()) {
								if (
									typeof packageJSON[bundle] !== "undefined"
								) {
									workflowBase.add(`
            - uses: actions/setup-node@v4.0.0
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
								if (
									Object.prototype.hasOwnProperty.call(
										packageJSON,
										key,
									)
								) {
									const values = packageJSON[key];
									if (key === "scripts") {
										for (const scripts in values) {
											if (
												Object.prototype.hasOwnProperty.call(
													values,
													scripts,
												)
											) {
												if (scripts === "build") {
													workflowBase.add(`
													- run: pnpm run build
													working-directory: .

            - uses: actions/upload-artifact@v4.0.0
              with:
                  name: .${packageDirectory.replaceAll("/", "-")}-Node-\${{ matrix.node-version }}-Target
                  path: .${packageDirectory}/Target
`);
												}
												if (
													scripts === "prepublishOnly"
												) {
													workflowBase.add(`
            - run: pnpm run prepublishOnly
              working-directory: .

            - uses: actions/upload-artifact@v4.0.0
              with:
                  name: .${packageDirectory.replaceAll("/", "-")}-Node-\${{ matrix.node-version }}-Target
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
						await (await import("fs/promises")).mkdir(
							`${githubDir}${Path}`,
							{
								recursive: true,
							},
						);
					} catch {
						console.log(`Could not create: ${githubDir}${Path}`);
					}
					try {
						await (await import("fs/promises")).writeFile(
							`${githubDir}${Path}${Name}`,
							`${[...workflowBase].join("")}`,
						);
					} catch {
						console.log(
							`Could not create workflow for: ${githubDir}/workflows/Node.yml`,
						);
					}
				} else {
					try {
						await (await import("fs/promises")).access(
							`${githubDir}${Path}${Name}`,
							(await import("fs/promises")).constants.W_OK,
						);
						try {
							await (await import("fs/promises")).rm(
								`${githubDir}${Path}${Name}`,
							);
						} catch {
							console.log(
								`Could not remove ${Path}${Name} for: ${githubDir}`,
							);
						}
					} catch (_Error) {
						console.log(_Error);
					}
				}
			}
		}
	})((await import("../Variable/Node.js")).default);
export { Node_default as default };
