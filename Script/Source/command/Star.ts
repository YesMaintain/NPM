import Glob from "fast-glob";
import { readFile as File } from "fs/promises";
import Star from "../Library/Star.js";
import Environment from "../Library/Environment.js";

export default async () => {
	const Dependencies = new Set<string>();

	for (const Package of await Glob(["**/package.json", "!**/node_modules"], {
		absolute: true,
		cwd: Environment.BASE_DIR,
	})) {
		const JSONPackage = JSON.parse(
			(await File(Package, "utf-8")).toString()
		);

		for (const Key in JSONPackage) {
			if (Object.prototype.hasOwnProperty.call(JSONPackage, Key)) {
				if (Key === "dependencies" || Key === "devDependencies") {
					for (const dependency in JSONPackage[Key]) {
						if (
							Object.prototype.hasOwnProperty.call(
								JSONPackage[Key],
								dependency
							)
						) {
							Dependencies.add(dependency);
						}
					}
				}
			}
		}
	}

	for (const Dependency of Dependencies) {
		Star(
			(
				await (
					await fetch(`https://registry.npmjs.org/${Dependency}`)
				).json()
			).repository.url
		);
	}
};
