var Dependabot_default = async () => await (async (Files) => {
  for (const { Path, Name, File } of Files) {
    for (const [_Dir, FilesPackage] of await (await import("../Function/Directory.js")).default(
      await (await import("../Function/Package.js")).default()
    )) {
      const GitHub = `${_Dir}/.github`;
      const Base = await File();
      if (Path === "/") {
        for (const Package of FilesPackage) {
          const DirPackage = (await import("path")).dirname(Package).replace(_Dir, "");
          const Environment = (await (await import("../Function/Type.js")).default()).get(Package.split("/").pop());
          if (Environment !== "Cloudflare") {
            Base.add(`
    - package-ecosystem: "${typeof Environment !== "undefined" ? String(Environment).toLowerCase() : (() => {
              switch (Package.split(".").pop()) {
                case "csproj":
                  return "nuget";
                default:
                  return "npm";
              }
            })()}"
      directory: "${DirPackage ? DirPackage : "/"}"
      schedule:
          interval: "daily"
      versioning-strategy: ${typeof Environment !== "undefined" ? (() => {
              switch (Environment) {
                case "Cargo":
                  return "lockfile-only";
                default:
                  return "increase";
              }
            })() : "increase"}
`);
          }
        }
      }
      if (Base.size > 0) {
        try {
          await (await import("fs/promises")).mkdir(`${GitHub}${Path}`, {
            recursive: true
          });
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
            `Could not create workflow for: ${GitHub}/dependabot.yml`
          );
        }
      } else {
        try {
          await (await import("fs/promises")).access(
            `${GitHub}${Path}${Name}`,
            (await import("fs/promises")).constants.W_OK
          );
          try {
            await (await import("fs/promises")).rm(`${GitHub}${Path}${Name}`);
          } catch {
            console.log(
              `Could not remove ${Path}${Name} for: ${GitHub}`
            );
          }
        } catch {
        }
      }
    }
  }
})((await import("../Variable/Dependabot.js")).default);
export {
  Dependabot_default as default
};
