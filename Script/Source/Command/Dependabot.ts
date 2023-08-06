import { constants as Constant } from "fs";
import {
	access as Access,
	mkdir as Make,
	rm as Remove,
	writeFile as File,
} from "fs/promises";
import { dirname as Dir } from "path";
import DirsGit from "../Library/Dirs.js";
import Types from "../Library/Types.js";
import Packages from "../Library/Packages.js";
import Dependabot from "../Option/Dependabot.js";
import type { Containers } from "../Option/Workflow.js";

/**
 * It creates a `dependabot.yml` file in each `.github` directory of each repository in the current
 * working directory
 * @param {Containers} Files - This is an array of objects that contain the path, name, and workflow
 * function.
 */
const Flows = async (Files: Containers) => {
	for (const { Path, Name, Flow } of Files) {
		for (const [_Dir, FilesPackage] of await DirsGit(await Packages())) {
			const DirGitHub = `${_Dir}/.github`;
			const Base = await Flow();

			if (Path === "/") {
				for (const Package of FilesPackage) {
					const DirPackage = Dir(Package).replace(_Dir, "");

					const Environment = (await Types()).get(
						Package.split("/").pop()
					);

					Base.add(`
    - package-ecosystem: "${
		typeof Environment !== "undefined"
			? Environment
			: (() => {
					switch (Package.split(".").pop()) {
						case "csproj":
							return "nuget";
						default:
							return "npm";
					}
			  })()
	}"
      directory: "${DirPackage ? DirPackage : "/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${
			typeof Environment !== "undefined"
				? (() => {
						switch (Environment) {
							case "cargo":
								return "lockfile-only";
							default:
								return "increase";
						}
				  })()
				: "increase"
		}
`);
				}
			}

			if (Base.size > 0) {
				try {
					await Make(`${DirGitHub}${Path}`, {
						recursive: true,
					});
				} catch {
					console.log(`Could not create: ${DirGitHub}${Path}`);
				}

				try {
					await File(
						`${DirGitHub}${Path}${Name}`,
						`${[...Base].join("")}`
					);
				} catch {
					console.log(
						`Could not create workflow for: ${DirGitHub}/dependabot.yml`
					);
				}
			} else {
				try {
					await Access(`${DirGitHub}${Path}${Name}`, Constant.F_OK);

					try {
						await Remove(`${DirGitHub}${Path}${Name}`);
					} catch {
						console.log(
							`Could not remove ${Path}${Name} for: ${DirGitHub}`
						);
					}
				} catch {}
			}
		}
	}
};

export default async () => await Flows(Dependabot);
