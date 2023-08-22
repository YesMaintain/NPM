import { constants as Constant } from "fs";
import { access, mkdir, rm, writeFile } from "fs/promises";
import { dirname as Dir } from "path";
import gitDirectories from "../Library/Directory.js";
import Package from "../Library/Package.js";
import Type from "../Library/Type.js";
import Cloudflare from "../Option/Cloudflare.js";
import type { Files } from "../Option/Index.js";

/**
 * The function `Workflow` iterates through a list of files, checks if a specific file exists, and
 * performs certain actions based on the conditions.
 * @param {Files} files - The `files` parameter is an array of objects. Each object represents a file
 * and has the following properties:
 */
const Workflow = async (files: Files) => {
	for (const { Path, Name, File } of files) {
		for (const [directory, packageFiles] of await gitDirectories(
			await Package("Cloudflare")
		)) {
			const githubDir = `${directory}/.github`;
			const workflowBase = await File();

			if (Path === "/workflows/" && Name === "Cloudflare.yml") {
				for (const _package of packageFiles) {
					const packageDirectory = Dir(_package).replace(
						directory,
						""
					);

					const environment = (await Type()).get(
						_package.split("/").pop()
					);

					if (
						typeof environment !== "undefined" &&
						environment === "Cloudflare"
					) {
						try {
							workflowBase.add(`
            - uses: cloudflare/wrangler-action@v3
              with:
                  apiToken: \${{ secrets.CF_API_TOKEN }}
                  accountId: \${{ secrets.CF_ACCOUNT_ID }}
                  workingDirectory: .${packageDirectory}
`);
						} catch (_Error) {
							console.log(_package);
							console.log(_Error);
						}
					}
				}
			}

			if (workflowBase.size > 1) {
				try {
					await mkdir(`${githubDir}${Path}`, {
						recursive: true,
					});
				} catch {
					console.log(`Could not create: ${githubDir}${Path}`);
				}

				try {
					await writeFile(
						`${githubDir}${Path}${Name}`,
						`${[...workflowBase].join("")}`
					);
				} catch {
					console.log(
						`Could not create workflow for: ${githubDir}/workflows/Cloudflare.yml`
					);
				}
			} else {
				try {
					await access(`${githubDir}${Path}${Name}`, Constant.F_OK);

					try {
						await rm(`${githubDir}${Path}${Name}`);
					} catch {
						console.log(
							`Could not remove ${Path}${Name} for: ${githubDir}`
						);
					}
				} catch {}
			}
		}
	}
};

export default async () => await Workflow(Cloudflare);
