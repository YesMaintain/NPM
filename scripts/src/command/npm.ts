import { access, constants, mkdir, rm, writeFile } from "fs/promises";
import gitDirectories from "../lib/git-directories.js";
import packages from "../lib/packages.js";
import npm from "../options/npm.js";
import type { containers } from "../options/workflow.js";

/**
 * This function writes workflows to GitHub directories based on specified files and packages.
 * @param {containers} files - The `files` parameter is an array of objects containing information
 * about the files to be written. Each object has the following properties:
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
