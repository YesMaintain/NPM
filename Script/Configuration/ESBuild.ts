import type { PluginBuild as Build, BuildOptions as Option } from "esbuild";
import { copy as Copy } from "esbuild-plugin-copy";
import {
	access as Access,
	constants as Constant,
	mkdir as Make,
	rm as Remove,
} from "fs/promises";

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
			setup(Build: Build) {
				Build.onStart(async () => {
					try {
						await Access(Out, Constant.R_OK);
					} catch (_Error) {
						await Make(Out, {
							recursive: true,
						});
					}

					try {
						await Remove(Out, {
							recursive: true,
						});
					} catch (_Error) {
						console.log(_Error);
					}
				});
			},
		},
		Copy({
			resolveFrom: "out",
			assets: [
				{
					from: "./Source/Configuration/TypeScript.json",
					to: "./Configuration/",
				},
			],
		}),
	],
} satisfies Option;
