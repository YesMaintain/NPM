import type { Type as Files } from "../Interface/Files.js";

import { readFile as File } from "fs/promises";
import { dirname as Dir, resolve as Resolve } from "path";
import { fileURLToPath as Path } from "url";

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
							)}/../../Target/Workflow/dependabot.yml`
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
							)}/../../Target/Workflow/InnerDependabot.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies Files as Files;
