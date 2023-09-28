import Glob from "fast-glob";
import { readFile as File } from "fs/promises";
import Environment from "../Library/Environment.js";
import Star from "../Library/Star.js";
var Star_default = async () => {
  const Dependency = /* @__PURE__ */ new Set();
  for (const Package of await Glob(["**/package.json", "!**/node_modules"], {
    absolute: true,
    cwd: Environment.Base
  })) {
    const _JSON = JSON.parse((await File(Package, "utf-8")).toString());
    for (const Key in _JSON) {
      if (Object.prototype.hasOwnProperty.call(_JSON, Key)) {
        if (Key === "dependencies" || Key === "devDependencies") {
          for (const Package2 in _JSON[Key]) {
            if (Object.prototype.hasOwnProperty.call(
              _JSON[Key],
              Package2
            )) {
              Dependency.add(Package2);
            }
          }
        }
      }
    }
  }
  for (const _Dependency of Dependency) {
    Star(
      (await (await fetch(`https://registry.npmjs.org/${_Dependency}`)).json()).repository.url
    );
  }
};
export {
  Star_default as default
};
