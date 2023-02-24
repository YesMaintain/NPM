import * as fs from "fs";

import gitDirectories from "../lib/git-directories.js";
import packages from "../lib/packages.js";
import pull from "../options/pull.js";
import type { containers } from "../options/workflow.js";

/**
 * It creates a `pull.yml` file in each `.github` directory of each repository in the current
 * working directory
 * @param {containers} files - This is an array of objects that contain the path, name, and workflow
 * function.
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
						`Could not create workflow for: ${githubDir}/workflows/pull.yml`
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
	await writeWorkflows(pull);
};
