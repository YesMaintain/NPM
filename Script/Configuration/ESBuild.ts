import type { PluginBuild as Build, BuildOptions } from "esbuild";

import { copy as Copy } from "esbuild-plugin-copy";

import { rm as Remove } from "fs/promises";

const Out = "Target";

export default {
	format: "esm",
	minify: false,
	outdir: Out,
	platform: "node",
	target: "esnext",
	write: true,
	plugins: [
		{
			name: "Target",
			setup(}) {
				Build.onStart(async () => {
					try {
						await Remove(Out, {
							recursive: true,
						});
					} catch (_Error) {}
				});
			},
		},
		Copy({
			resolveFrom: "out",
			assets: [
				{
					from: "./Source/Workflow/*.yml",
					to: "./Workflow/",
				},
			],
		}),
	],
} satisfies Type;
