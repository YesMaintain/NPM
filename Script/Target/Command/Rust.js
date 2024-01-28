var Rust_default = async () => await (async (Files) => {
  for (const { Path, Name, File } of Files) {
    for (const [_Directory, FilesPackage] of await (await import("../Function/Directory.js")).default(
      await (await import("../Function/Package.js")).default("Cargo")
    )) {
      const GitHub = `${_Directory}/.github`;
      const Base = await File();
      if (Path === "/workflows/" && Name === "Rust.yml") {
        for (const Package of FilesPackage) {
          const Directory = (await import("path")).dirname(Package).replace(_Directory, "");
          const Environment = (await (await import("../Function/Type.js")).default()).get(Package.split("/").pop());
          if (typeof Environment !== "undefined" && Environment === "Cargo") {
            Base.add(`
            - uses: actions/cache@v4.0.0
              with:
                  path: |
                      ~/.cargo/bin/
                      ~/.cargo/registry/index/
                      ~/.cargo/registry/cache/
                      ~/.cargo/git/db/
                      target/
                      Target/
                  key: \${{ runner.os }}-cargo-\${{ hashFiles('.${Directory}/Cargo.toml') }}
            - uses: actions-rs/cargo@v1.0.3
              with:
                command: build
                args: --release --all-features --manifest-path .${Directory}/${(await import("path")).basename(Package)}
`);
          }
        }
      }
      if (Base.size > 1) {
        try {
          await (await import("fs/promises")).mkdir(
            `${GitHub}${Path}`,
            {
              recursive: true
            }
          );
        } catch {
          console.log(`Could not create: ${GitHub}${Path}`);
        }
        try {
          await (await import("fs/promises")).writeFile(
            `${GitHub}${Path}${Name}`,
            `${[...Base].join("")}`
          );
        } catch {
          console.log(
            `Could not create workflow for: ${GitHub}/workflows/Rust.yml`
          );
        }
      }
    }
  }
})((await import("../Variable/Rust.js")).default);
export {
  Rust_default as default
};
