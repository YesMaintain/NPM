import * as fs from "fs";

import gitDirectories from "../lib/git-directories.js";
import packages from "../lib/packages.js";
import funding from "../options/funding.js";
import type { containers } from "../options/workflow.js";

/**
 * It takes a list of files, and for each file, it checks if the file is a workflow file, and if it is,
 * it checks if the file is a node workflow file, and if it is, it checks if the file is a node
 * workflow file for a package that has dependencies, and if it is, it adds the dependencies to the
 * workflow file
 * @param {containers} files - containers
 */
const writeWorkflows = async (files: containers) => {
	for (const { path, name, workflow } of files) {
		for (const [directory] of await gitDirectories(await packages())) {
			const githubDir = `${directory}/.github`;
			const workflowBase = await workflow();

			if (workflowBase.size > 0) {
				try {
					await fs.promises.mkdir(`${githubDir}${path}`, {
						recursive: true,
					});
				} catch {
					console.log(`Could not create: ${githubDir}${path}`);
				}

				try {
					await fs.promises.writeFile(
						`${githubDir}${path}${name}`,
						`${[...workflowBase].join("")}`
					);
				} catch {
					console.log(
						`Could not create workflow for: ${githubDir}/FUNDING.yml`
					);
				}
			} else {
				try {
					await fs.promises.access(
						`${githubDir}${path}${name}`,
						fs.constants.F_OK
					);

					try {
						await fs.promises.rm(`${githubDir}${path}${name}`);
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
	await writeWorkflows(funding);
};
