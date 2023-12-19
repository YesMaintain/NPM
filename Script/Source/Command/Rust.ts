/**
 * @module Rust
 *
 */
/**
 * It takes a list of files, and for each file, it checks if the file is a workflow file, and if it is,
 * it checks if the file is a node workflow file, and if it is, it checks if the file is a node
 * workflow file for a package that has dependencies, and if it is, it adds the dependencies to the
 * workflow file
 * @param Files - containers
 *
 */
export default async () =>
	await (async (Files: Files) => {
		for (const { Path, Name, File } of Files) {
			for (const [directory, packageFiles] of await (
				await import("../Function/Directory.js")
			).default(
				await (await import("../Function/Package.js")).default("Cargo")
			)) {
				const githubDir = `${directory}/.github`;
				const workflowBase = await File();

				if (Path === "/workflows/" && Name === "Rust.yml") {
					for (const _package of packageFiles) {
						const packageDirectory = (await import("path"))
							.dirname(_package)
							.replace(directory, "");

						const environment = (
							await (
								await import("../Function/Type.js")
							).default()
						).get(_package.split("/").pop());

						if (
							typeof environment !== "undefined" &&
							environment === "Cargo"
						) {
							workflowBase.add(`
            - uses: actions/cache@v3.3.2
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
                args: --release --all-features --manifest-path .${packageDirectory}/${(
					await import("path")
				).basename(_package)}
`);
						}
					}
				}

				if (workflowBase.size > 1) {
					try {
						await (
							await import("fs/promises")
						).mkdir(`${githubDir}${Path}`, {
							recursive: true,
						});
					} catch {
						console.log(`Could not create: ${githubDir}${Path}`);
					}

					try {
						await (
							await import("fs/promises")
						).writeFile(
							`${githubDir}${Path}${Name}`,
							`${[...workflowBase].join("")}`
						);
					} catch {
						console.log(
							`Could not create workflow for: ${githubDir}/workflows/Rust.yml`
						);
					}
				}
			}
		}
	})((await import("../Variable/Rust.js")).default);

import type Files from "../Type/Files.js";
