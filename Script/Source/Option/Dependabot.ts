import { readFile as File } from "fs/promises";
import { dirname as Dir, resolve as Resolve } from "path";

import { fileURLToPath as Path } from "url";
import type { Workflow } from "./Index.js";

export default new Set([
	{
		Path: "/",
		Name: "dependabot.yml",
		File: async () =>
			new Set([
				(
					await File(
						Resolve(
							`${Dir(
								Path(import.meta.url)
							)}/../../Source/templates/.github/dependabot.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
	{
		Path: "/workflows/",
		Name: "Dependabot.yml",
		File: async () =>
			new Set([
				(
					await File(
						Resolve(
							`${Dir(
								Path(import.meta.url)
							)}/../../Source/templates/.github/workflows/Dependabot.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies Workflow;
