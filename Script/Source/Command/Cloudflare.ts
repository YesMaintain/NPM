import { constants as Constant } from "fs";
import { access, mkdir, readFile, rm, writeFile } from "fs/promises";
import { dirname as Dir } from "path";
import toml from "toml";
import gitDirectories from "../Library/Directory.js";
import Package from "../Library/Package.js";
import Type from "../Library/Type.js";
import Cloudflare from "../Option/Cloudflare.js";
import type { Files } from "../Option/Index.js";

/**
 * It takes a list of files, and for each file, it checks if the file is a workflow file, and if it is,
 * it checks if the file is a node workflow file, and if it is, it checks if the file is a node
 * workflow file for a package that has dependencies, and if it is, it adds the dependencies to the
 * workflow file
 * @param {Files} files - containers
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
					const packageFile = (
						await readFile(_package, "utf-8")
					).toString();

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
                  workingDirectory: "subfoldername"
`)
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
