import Glob from "fast-glob";
import { readFile as File } from "fs/promises";
import Environment from "../Library/Environment.js";
import Star from "../Library/Star.js";

export default async () => {
	const Dependencies = new Set<string>();

	for (const Package of await Glob(["**/package.json", "!**/node_modules"], {
		absolute: true,
		cwd: Environment.Base,
	})) {
		const _JSON = JSON.parse((await File(Package, "utf-8")).toString());

		for (const Key in _JSON) {
			if (Object.prototype.hasOwnProperty.call(_JSON, Key)) {
				if (Key === "dependencies" || Key === "devDependencies") {
					for (const dependency in _JSON[Key]) {
						if (
							Object.prototype.hasOwnProperty.call(
								_JSON[Key],
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
