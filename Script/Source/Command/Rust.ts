import { constants as Constant } from "fs";
import {
	access as Access,
	writeFile as _File,
	mkdir as Make,
	rm as Remove,
} from "fs/promises";
import { basename, dirname } from "path";
import gitDirectories from "../Library/Directory.js";
import Packages from "../Library/Package.js";
import Types from "../Library/Type.js";
import Rust from "../Option/Rust.js";
import type { Files } from "../Option/Index.js";

/**
 * It takes a list of files, and for each file, it checks if the file is a workflow file, and if it is,
 * it checks if the file is a node workflow file, and if it is, it checks if the file is a node
 * workflow file for a package that has dependencies, and if it is, it adds the dependencies to the
 * workflow file
 * @param {Files} Files - containers
 */
const Workflow = async (Files: Files) => {
	for (const { Path, Name, File } of Files) {
		for (const [directory, packageFiles] of await gitDirectories(
			await Packages("Cargo")
		)) {
			const githubDir = `${directory}/.github`;
			const workflowBase = await File();

			if (Path === "/workflows/" && Name === "Rust.yml") {
				for (const _package of packageFiles) {
					const packageDirectory = dirname(_package).replace(
						directory,
						""
					);

					const environment = (await Types()).get(
						_package.split("/").pop()
					);

					if (
						typeof environment !== "undefined" &&
						environment === "Cargo"
					) {
						workflowBase.add(`
            - uses: actions/cache@v3.3.1
              with:
                  path: |
                      ~/.cargo/bin/
                      ~/.cargo/registry/index/
                      ~/.cargo/registry/cache/
                      ~/.cargo/git/db/
                      target/
                      Target/
                  key: \${{ runner.os }}-cargo-\${{ hashFiles('.${packageDirectory}/Cargo.toml') }}
            - uses: actions-rs/cargo@v1.0.3
              with:
                command: build
                args: --release --all-features --manifest-path .${packageDirectory}/${basename(
					_package
				)}
`);
					}
				}
			}

			if (workflowBase.size > 1) {
				try {
					await Make(`${githubDir}${Path}`, {
						recursive: true,
					});
				} catch {
					console.log(`Could not create: ${githubDir}${Path}`);
				}

				try {
					await _File(
						`${githubDir}${Path}${Name}`,
						`${[...workflowBase].join("")}`
					);
				} catch {
					console.log(
						`Could not create workflow for: ${githubDir}/workflows/Rust.yml`
					);
				}
			} else {
				try {
					await Access(`${githubDir}${Path}${Name}`, Constant.F_OK);

					try {
						await Remove(`${githubDir}${Path}${Name}`);
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

export default async () => await Workflow(Rust);
