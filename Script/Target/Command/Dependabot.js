import DirsGit from "../Library/Directory.js";
import Packages from "../Library/Package.js";
import Types from "../Library/Type.js";
import Dependabot from "../Option/Dependabot.js";
import { constants as Constant } from "fs";
import {
  access as Access,
  mkdir as Make,
  rm as Remove,
  writeFile as _File
} from "fs/promises";
import { dirname as Dir } from "path";
const Workflow = async (Files) => {
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
          await Make(`${GitHub}${Path}`, {
            recursive: true
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
        } catch {
        }
      }
    }
  }
};
var Dependabot_default = async () => await Workflow(Dependabot);
export {
  Dependabot_default as default
};
