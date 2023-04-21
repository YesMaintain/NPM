import { access, constants, mkdir, rm, writeFile } from "fs/promises";
import gitDirectories from "../lib/git-directories.js";
import packages from "../lib/packages.js";
import npm from "../options/npm.js";
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
		for (const [directory, _packageFiles] of await gitDirectories(
			await packages("npm")
		)) {
			const githubDir = `${directory}/.github`;
			const workflowBase = await workflow();

			if (workflowBase.size > 0) {
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
