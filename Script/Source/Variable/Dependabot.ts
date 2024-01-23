/**
 * @module Dependabot
 *
 */
export default new Set([
	{
		Path: "/",
		Name: "dependabot.yml",
		File: async () =>
			new Set([
				(
					await readFile(
						resolve(
							`${dirname(
								fileURLToPath(import.meta.url),
							)}/../../Target/Workflow/dependabot.yml`,
						),
						"utf-8",
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
					await readFile(
						resolve(
							`${dirname(
								fileURLToPath(import.meta.url),
							)}/../../Target/Workflow/InnerDependabot.yml`,
						),
						"utf-8",
					)
				).toString(),
			]),
	},
]) satisfies Type;

import type Type from "../Type/Files.js";

export const { readFile } = await import("node:fs/promises");

export const { dirname, resolve } = await import("node:path");

export const { fileURLToPath } = await import("node:url");
