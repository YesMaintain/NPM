import { constants as Constant } from "fs";
import { access, mkdir, readFile, rm, writeFile } from "fs/promises";
import { dirname } from "path";
import gitDirectories from "../Library/Dirs.js";
import packageTypes from "../Library/Types.js";
import packages from "../Library/Packages.js";
import node from "../Option/NODE.js";
import type { Containers } from "../Option/Workflow.js";

/**
 * It takes a list of files, and for each file, it checks if the file is a workflow file, and if it is,
 * it checks if the file is a node workflow file, and if it is, it checks if the file is a node
 * workflow file for a package that has dependencies, and if it is, it adds the dependencies to the
 * workflow file
 * @param {Containers} files - containers
 */
const writeWorkflows = async (files: Containers) => {
	for (const { Path, Name, Flow } of files) {
		for (const [directory, packageFiles] of await gitDirectories(
			await packages("npm")
		)) {
			const githubDir = `${directory}/.github`;
			const workflowBase = await Flow();

			if (Path === "/workflows/" && Name === "node.yml") {
				for (const _package of packageFiles) {
					const packageDirectory = dirname(_package).replace(
						directory,
						""
					);
					const packageFile = (
						await readFile(_package, "utf-8")
					).toString();

					const environment = (await packageTypes()).get(
						_package.split("/").pop()
					);

					if (
						typeof environment !== "undefined" &&
						environment === "npm"
					) {
						try {
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
            - uses: actions/setup-node@v3.7.0
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
										key
									)
								) {
									const values = packageJSON[key];
									if (key === "scripts") {
										for (const scripts in values) {
											if (
												Object.prototype.hasOwnProperty.call(
													values,
													scripts
												)
											) {
												if (scripts === "build") {
													workflowBase.add(`
            - run: pnpm run build
              working-directory: .${packageDirectory}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${packageDirectory.replaceAll(
						"/",
						"-"
					)}-node-\${{ matrix.node-version }}-Target
                  path: .${packageDirectory}/Target
`);
												}

												if (
													scripts === "prepublishOnly"
												) {
													workflowBase.add(`
            - run: pnpm run prepublishOnly
              working-directory: .${packageDirectory}

            - uses: actions/upload-artifact@v3.1.2
              with:
                  name: .${packageDirectory.replaceAll(
						"/",
						"-"
					)}-node-\${{ matrix.node-version }}-Target
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
						} catch (error) {
							console.log(_package);
							console.log(error);
						}
					}
				}
			}

			if (workflowBase.size > 1) {
				try {
					await mkdir(`${githubDir}${Path}`, {
						recursive: true,
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
						`Could not create workflow for: ${githubDir}/workflows/node.yml`
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
				} catch {}
			}
		}
	}
};

export default async () => {
	await writeWorkflows(node);
};
