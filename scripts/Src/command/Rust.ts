import { constants as Constant } from "fs";
import {
	access as Access,
	mkdir as Make,
	rm as Remove,
	writeFile as File,
} from "fs/promises";
import { basename, dirname } from "path";
import gitDirectories from "../lib/Dirs.js";
import Types from "../lib/Types.js";
import Packages from "../lib/Packages.js";
import Rust from "../options/Rust.js";
import type { Containers } from "../options/Workflow.js";

/**
 * It takes a list of files, and for each file, it checks if the file is a workflow file, and if it is,
 * it checks if the file is a node workflow file, and if it is, it checks if the file is a node
 * workflow file for a package that has dependencies, and if it is, it adds the dependencies to the
 * workflow file
 * @param {Containers} files - containers
 */
const Flows = async (files: Containers) => {
	for (const { Path, Name, Flow } of files) {
		for (const [directory, packageFiles] of await gitDirectories(
			await Packages("cargo")
		)) {
			const githubDir = `${directory}/.github`;
			const workflowBase = await Flow();

			if (Path === "/workflows/" && Name === "rust.yml") {
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
						environment === "cargo"
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
					await File(
						`${githubDir}${Path}${Name}`,
						`${[...workflowBase].join("")}`
					);
				} catch {
					console.log(
						`Could not create workflow for: ${githubDir}/workflows/rust.yml`
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

export default async () => {
	await Flows(Rust);
};
