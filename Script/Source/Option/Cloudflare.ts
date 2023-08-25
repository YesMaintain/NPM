import { readFile as File } from "fs/promises";
import { dirname as Dir, resolve as Resolve } from "path";
import { fileURLToPath as Path } from "url";
import type { Files } from "./Index.js";

export default new Set([
	{
		Path: "/workflows/",
		Name: "Cloudflare.yml",
		File: async () =>
			new Set([
				(
					await File(
						Resolve(
							`${Dir(
								Path(import.meta.url)
							)}/../../Target/Workflow/Cloudflare.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies Files;