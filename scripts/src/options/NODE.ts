import { readFile as File } from "fs/promises";
import { dirname as Dir, resolve } from "path";
import { fileURLToPath as URL } from "url";
import type { Containers } from "./Workflow.js";

const NameFile = URL(import.meta.url);
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
							`${NameDir}/../../src/templates/.github/workflows/node.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies Containers;
