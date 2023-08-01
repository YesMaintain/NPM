import { readFile } from "fs/promises";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import type { containers } from "./Workflow.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default new Set([
	{
		path: "/",
		name: "dependabot.yml",
		workflow: async () =>
			new Set([
				(
					await readFile(
						resolve(
							`${__dirname}/../../src/templates/.github/dependabot.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
	{
		path: "/workflows/",
		name: "dependabot.yml",
		workflow: async () =>
			new Set([
				(
					await readFile(
						resolve(
							`${__dirname}/../../src/templates/.github/workflows/dependabot.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies containers;
