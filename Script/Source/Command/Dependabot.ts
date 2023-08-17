import { constants as Constant } from "fs";
import {
	access as Access,
	writeFile as _File,
	mkdir as Make,
	rm as Remove,
} from "fs/promises";
import { dirname as Dir } from "path";
import DirsGit from "../Library/Directory.js";
import Packages from "../Library/Package.js";
import Types from "../Library/Type.js";
import Dependabot from "../Option/Dependabot.js";
import type { Files } from "../Option/Index.js";

/**
 * It creates a `dependabot.yml` file in each `.github` directory of each repository in the current
 * working directory
 * @param {Files} Files - This is an array of objects that contain the path, name, and workflow
 * function.
 */
const Workflow = async (Files: Files) => {
	for (const { Path, Name, File } of Files) {
		for (const [_Dir, FilesPackage] of await DirsGit(await Packages())) {
			const GitHub = `${_Dir}/.github`;
			const Base = await File();

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
					await Make(`${GitHub}${Path}`, {
						recursive: true,
					});
				} catch {
					console.log(`Could not create: ${GitHub}${Path}`);
				}

				try {
					await _File(
						`${GitHub}${Path}${Name}`,
						`${[...Base].join("")}`
					);
				} catch {
					console.log(
						`Could not create workflow for: ${GitHub}/dependabot.yml`
					);
				}
			} else {
				try {
					await Access(`${GitHub}${Path}${Name}`, Constant.F_OK);

					try {
						await Remove(`${GitHub}${Path}${Name}`);
					} catch {
						console.log(
							`Could not remove ${Path}${Name} for: ${GitHub}`
						);
					}
				} catch {}
			}
		}
	}
};

export default async () => await Workflow(Dependabot);
