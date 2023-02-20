import * as fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import type { containers } from "./workflow.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files: containers = new Set([
	{
		path: "/",
		name: "dependabot.yml",
		workflow: async () =>
			new Set([
				(
					await fs.promises.readFile(
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
					await fs.promises.readFile(
						resolve(
							`${__dirname}/../../src/templates/.github/workflows/dependabot.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]);

export default files;
