import { readFile as File } from "fs/promises";
import { dirname as Dir, resolve as Resolve } from "path";
import { fileURLToPath as Path } from "url";
import type { Workflow } from "./Index.js";

export default new Set([
	{
		Path: "/workflows/",
		Name: "NPM.yml",
		File: async () =>
			new Set([
				(
					await File(
						Resolve(
							`${Dir(
								Path(import.meta.url)
							)}/../../Source/templates/.github/workflows/NPM.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies Workflow;
