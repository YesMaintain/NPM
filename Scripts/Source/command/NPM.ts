import { constants as Constant } from "fs";
import { access, mkdir, readFile, rm, writeFile } from "fs/promises";
import { dirname } from "path";
import gitDirectories from "../Library/Dirs.js";
import packageTypes from "../Library/Types.js";
import packages from "../Library/Packages.js";
import npm from "../options/NPM.js";
import type { Containers } from "../options/Workflow.js";

/**
 * This function writes workflows for npm packages based on their package.json files.
 * @param {Containers} files - The `files` parameter is an array of objects containing information
 * about the files to be processed. Each object has the following properties:
 */
const writeWorkflows = async (files: Containers) => {
	for (const { Path, Name, Flow } of files) {
		for (const [directory, packageFiles] of await gitDirectories(
			await packages("npm")
		)) {
			const githubDir = `${directory}/.github`;
			const workflowBase = await Flow();

			if (Path === "/workflows/" && Name === "npm.yml") {
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
												if (
													scripts === "prepublishOnly"
												) {
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
						`Could not create workflow for: ${githubDir}/workflows/npm.yml`
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
	await writeWorkflows(npm);
};
