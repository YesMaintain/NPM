import { constants } from "fs";
import { access, mkdir, readFile, rm, writeFile } from "fs/promises";
import { dirname } from "path";
import gitDirectories from "../lib/GitDirectories.js";
import packageTypes from "../lib/PackageTypes.js";
import packages from "../lib/packages.js";
import npm from "../options/NPM.js";
import type { containers } from "../options/Workflow.js";

/**
 * This function writes workflows for npm packages based on their package.json files.
 * @param {containers} files - The `files` parameter is an array of objects containing information
 * about the files to be processed. Each object has the following properties:
 */
const writeWorkflows = async (files: containers) => {
	for (const { path, name, workflow } of files) {
		for (const [directory, packageFiles] of await gitDirectories(
			await packages("npm")
		)) {
			const githubDir = `${directory}/.github`;
			const workflowBase = await workflow();

			if (path === "/workflows/" && name === "npm.yml") {
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
					await mkdir(`${githubDir}${path}`, {
						recursive: true,
					});
				} catch {
					console.log(`Could not create: ${githubDir}${path}`);
				}

				try {
					await writeFile(
						`${githubDir}${path}${name}`,
						`${[...workflowBase].join("")}`
					);
				} catch {
					console.log(
						`Could not create workflow for: ${githubDir}/workflows/npm.yml`
					);
				}
			} else {
				try {
					await access(`${githubDir}${path}${name}`, constants.F_OK);

					try {
						await rm(`${githubDir}${path}${name}`);
					} catch {
						console.log(
							`Could not remove ${path}${name} for: ${githubDir}`
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
