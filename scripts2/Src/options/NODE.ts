import { readFile as File } from "fs/promises";
import { dirname as Dir, resolve } from "path";
import { fileURLToPath as Path } from "url";
import type { Containers } from "./Workflow.js";

const NameFile = Path(import.meta.url);
const NameDir = Dir(NameFile);

export default new Set([
	{
		Path: "/workflows/",
		Name: "node.yml",
		Flow: async () =>
			new Set([
				(
					await File(
						resolve(
							`${NameDir}/../../Src/templates/.github/workflows/node.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies Containers;
