import FastGlob from "fast-glob";

import env from "./env.js";
import packageTypes from "./package-types.js";

/**
 * It returns a set of all the directories that contain a package.json file
 */
const packages = async () =>
	new Set<string>([
		...(await FastGlob(
			[
				...Array.from((await packageTypes()).keys()).map(
					(_package) => `**/${_package}`
				),
				"!**/node_modules",
				"!**/target",
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
				cwd: env.BASE_DIR,
			}
		)),
	]);

export default packages;
