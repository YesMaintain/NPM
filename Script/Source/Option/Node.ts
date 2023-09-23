import type { Type as Files } from "../Interface/Files.js";

export default new Set([
	{
		Path: "/workflows/",
		Name: "Node.yml",
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
							)}/../../Target/Workflow/Node.yml`
						),
						"utf-8"
					)
				).toString(),
			]),
	},
]) satisfies Files;
