import { readFile as File } from "fs/promises";
import { dirname as Dir, resolve as Resolve } from "path";
import { fileURLToPath as Path } from "url";
import type { Containers } from "./Workflow.js";

const NameFile = Path(import.meta.url);
const NameDir = Dir(NameFile);

export default new Set([
	{
		Path: "/workflows/",
		Name: "npm.yml",
		Flow: async () =>
			new Set([
				(
					await File(
						Resolve(
							`${NameDir}/../../src/templates/.github/workflows/npm.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies Containers;
