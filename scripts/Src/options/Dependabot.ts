import { readFile as File } from "fs/promises";
import { dirname as Dir, resolve as Resolve } from "path";

import { fileURLToPath as Path } from "url";
import type { Containers } from "./Workflow.js";

const NameFile = Path(import.meta.url);
const NameDir = Dir(NameFile);

export default new Set([
	{
		Path: "/",
		Name: "dependabot.yml",
		Flow: async () =>
			new Set([
				(
					await File(
						Resolve(
							`${NameDir}/../../Src/templates/.github/dependabot.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
	{
		Path: "/workflows/",
		Name: "dependabot.yml",
		Flow: async () =>
			new Set([
				(
					await File(
						Resolve(
							`${NameDir}/../../Src/templates/.github/workflows/dependabot.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies Containers;
