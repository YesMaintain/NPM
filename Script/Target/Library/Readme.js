import Glob from "fast-glob";
import Environment from "./Environment.js";
var Readme_default = async () => new Set(
  [
    ...await Glob(["**/README.md"], {
      absolute: true,
      cwd: Environment.Base
    })
  ].sort()
);
export {
  Readme_default as default
};
