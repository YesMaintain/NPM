import star from "../lib/star-repository.js";
import { readFile } from "fs/promises";
import FastGlob from "fast-glob";
import env from "../lib/env.js";

export default async () => {
	const dependencies = new Set<string>();

	const packages = await FastGlob(["**/package.json", "!**/node_modules"], {
		absolute: true,
		cwd: env.BASE_DIR,
	});

	for (const packageFile of packages) {
		const packageJson = JSON.parse(
			(await readFile(packageFile, "utf-8")).toString()
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

		if (!packageJson.repository?.url) {
			continue;
		}

		star(packageJson.repository.url);
	}
};
