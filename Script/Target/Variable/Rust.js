var Rust_default = /* @__PURE__ */ new Set([
	{
		Path: "/workflows/",
		Name: "Rust.yml",
		File: async () =>
			/* @__PURE__ */ new Set([
				(
					await (
						await import("fs/promises")
					).readFile(
						(
							await import("path")
						).resolve(
							`${(
								await import("path")
							).dirname(
								(
									await import("url")
								).fileURLToPath(import.meta.url),
							)}/../../Target/Workflow/Rust.yml`,
						),
						"utf-8",
					)
				).toString(),
			]),
	},
]);
export { Rust_default as default };
