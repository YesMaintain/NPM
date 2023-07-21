import FastGlob from "fast-glob";
import { readFile } from "fs/promises";
import env from "../lib/env.js";
import star from "../lib/star-repository.js";

export default async () => {
	const dependencies = new Set<string>();

	const packages = await FastGlob(["**/package.json", "!**/node_modules"], {
		absolute: true,
		cwd: env.BASE_DIR,
	});

	for (const packageFile of packages) {
		const packageJSON = JSON.parse(
			(await readFile(packageFile, "utf-8")).toString()
		);

		for (const key in packageJSON) {
			if (Object.prototype.hasOwnProperty.call(packageJSON, key)) {
				if (key === "dependencies" || key === "devDependencies") {
					for (const dependency in packageJSON[key]) {
						if (
							Object.prototype.hasOwnProperty.call(
								packageJSON[key],
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
		const packageJSON = await (
			await fetch(`https://registry.npmjs.org/${dependency}`)
		).json();

		if (!packageJSON.repository?.url) {
			continue;
		}

		star(packageJSON.repository.url);
	}
};
