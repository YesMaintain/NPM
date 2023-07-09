import { access, mkdir, rm, writeFile } from "fs/promises";
import type { containers } from "../options/workflow.js";
import gitDirectories from "../lib/git-directories.js";
import packageTypes from "../lib/package-types.js";
import packages from "../lib/packages.js";
import { basename, dirname } from "path";
import rust from "../options/rust.js";
import { constants } from "fs";

/**
 * It takes a list of files, and for each file, it checks if the file is a workflow file, and if it is,
 * it checks if the file is a node workflow file, and if it is, it checks if the file is a node
 * workflow file for a package that has dependencies, and if it is, it adds the dependencies to the
 * workflow file
 * @param {containers} files - containers
 */
const writeWorkflows = async (files: containers) => {
	for (const { path, name, workflow } of files) {
		for (const [directory, packageFiles] of await gitDirectories(
			await packages("cargo"),
		)) {
			const githubDir = `${directory}/.github`;
			const workflowBase = await workflow();

			if (path === "/workflows/" && name === "rust.yml") {
				for (const _package of packageFiles) {
					const packageDirectory = dirname(_package).replace(directory, "");

					const environment = (await packageTypes()).get(
						_package.split("/").pop(),
					);

					if (typeof environment !== "undefined" && environment === "cargo") {
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
							_package,
						)}
`);
					}
				}
			}

			if (workflowBase.size > 1) {
				try {
					await mkdir(`${githubDir}${path}`, {
						recursive: true,
					});
				} catch {
					console.log(`Could not create: ${githubDir}${path}`);
				}

				try {
					await writeFile(
						`${githubDir}${path}${name}`,
						`${[...workflowBase].join("")}`,
					);
				} catch {
					console.log(
						`Could not create workflow for: ${githubDir}/workflows/rust.yml`,
					);
				}
			} else {
				try {
					await access(`${githubDir}${path}${name}`, constants.F_OK);

					try {
						await rm(`${githubDir}${path}${name}`);
					} catch {
						console.log(`Could not remove ${path}${name} for: ${githubDir}`);
					}
				} catch {}
			}
		}
	}
};

export default async () => {
	await writeWorkflows(rust);
};
