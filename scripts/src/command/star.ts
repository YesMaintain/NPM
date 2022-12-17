import FastGlob from "fast-glob";
import * as fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import env from "../lib/env.js";
import star from "../lib/star-repository.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * It finds all the package.json files in the project, and then stars all the dependencies in those
 * package.json files
 */
const starUsed = async () => {
	const dependencies = new Set<string>();

	const packages = await FastGlob(["**/package.json", "!**/node_modules"], {
		absolute: true,
		cwd: env.BASE_DIR,
	});

	for (const packageFile of packages) {
		const packageJson = JSON.parse(
			(await fs.promises.readFile(packageFile, "utf-8")).toString()
		);

		for (const key in packageJson) {
			if (Object.prototype.hasOwnProperty.call(packageJson, key)) {
				if (key === "dependencies" || key === "devDependencies") {
					for (const dependency in packageJson[key]) {
						if (
							Object.prototype.hasOwnProperty.call(
								packageJson[key],
								dependency
							)
						) {
							dependencies.add(dependency);
						}
					}
				}
			}
		}
	}

	for (const dependency of dependencies) {
		const packageJson = await (
			await fetch(`https://registry.npmjs.org/${dependency}`)
		).json();

		star(packageJson.repository.url);
	}
};
export default starUsed;
