import * as fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import type { containers } from "./workflow.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default new Set([
	{
		path: "/",
		name: "FUNDING.yml",
		workflow: async () =>
			new Set([
				(
					await fs.promises.readFile(
						resolve(
							`${__dirname}/../../src/templates/.github/FUNDING.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies containers;
