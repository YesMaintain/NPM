import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import type { containers } from "./workflow.js";
import { readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default new Set([
	{
		path: "/",
		name: "FUNDING.yml",
		workflow: async () =>
			new Set([
				(
					await readFile(
						resolve(
							`${__dirname}/../../src/templates/.github/FUNDING.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies containers;
