import type Type from "../Interface/Files.js";

export default new Set([
	{
		Path: "/workflows/",
		Name: "Rust.yml",
		File: async () =>
			new Set([
				(
					await (
						await import("fs/promises")
					).readFile(
						(await import("path")).resolve(
							`${(await import("path")).dirname(
								(await import("url")).fileURLToPath(
									import.meta.url
								)
							)}/../../Target/Workflow/Rust.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies Type as Type;
