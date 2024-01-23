/**
 * @module Rust
 *
 */
export default new Set([
	{
		Path: "/workflows/",
		Name: "Rust.yml",
		File: async () =>
			new Set([
				(
					await (
						await import("node:fs/promises")
					).readFile(
						(
							await import("node:path")
						).resolve(
							`${(
								await import("node:path")
							).dirname(
								(
									await import("node:url")
								).fileURLToPath(import.meta.url),
							)}/../../Target/Workflow/Rust.yml`,
						),
						"utf-8",
					)
				).toString(),
			]),
	},
]) satisfies Type;

import type Type from "../Type/Files.js";
