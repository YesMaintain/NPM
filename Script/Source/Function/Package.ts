import type { Type } from "./Type.js";

import Environment from "./Environment.js";
import Types from "./Type.js";

import Glob from "fast-glob";

export default async (Filter: Type = false) =>
	new Set<string>(
		[
			...(await Glob(
				[
					...[...(await Types(Filter)).keys()].map(
						(Package) => `**/${Package}`
					),
					"!**/node_modules",
					"!**/target",
					"!**/Target",
					"!**/dist",
					"!**/Dist",
					"!**/__pycache__/",
					"!**/_ReSharper*/",
					"!**/_UpgradeReport_Files/",
					"!**/!?*.[Cc]ache/",
					"!**/!**/[Pp]ackages/build/",
					"!**/.fake/",
					"!**/.idea/",
					"!**/.localhistory/",
					"!**/.mfractor/",
					"!**/.sass-cache/",
					"!**/.vs/",
					"!**/[Aa][Rr][Mm]/",
					"!**/[Aa][Rr][Mm]64/",
					"!**/[Bb]in/",
					"!**/[Dd]ebug/",
					"!**/[Dd]ebugPS/",
					"!**/[Dd]ebugPublic/",
					"!**/[Ee]xpress/",
					"!**/[Ll]og/",
					"!**/[Oo]bj/",
					"!**/[Rr]elease/",
					"!**/[Rr]eleasePS/",
					"!**/[Rr]eleases/",
					"!**/[Tt]est[Rr]esult*/",
					"!**/#bower_components/",
					"!**/#wwwroot/",
					"!**/$tf/",
					"!**/AppPackages/",
					"!**/artifacts/",
					"!**/ASALocalRun/",
					"!**/AutoTest.Net/",
					"!**/Backup*/",
					"!**/BenchmarkDotNet.Artifacts/",
					"!**/bld/",
					"!**/BundleArtifacts/",
					"!**/ClientBin/",
					"!**/csx/",
					"!**/DocProject/buildhelp/",
					"!**/ecf/",
					"!**/FakesAssemblies/",
					"!**/Generated Files/",
					"!**/Generated_Code/",
					"!**/ipch/",
					"!**/node_modules/",
					"!**/OpenCover/",
					"!**/paket-files/",
					"!**/publish/",
					"!**/PublishScripts/",
					"!**/rcf/",
					"!**/ServiceFabricBackup/",
					"!**/x64/",
					"!**/x86/",
				],
				{
					absolute: true,
					cwd: Environment.Base,
				}
			)),
		].sort()
	);
