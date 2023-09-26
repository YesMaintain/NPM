import Glob from "fast-glob";
import Environment from "./Environment.js";
var Git_default = async () => new Set(
  [
    ...await Glob(["**/.git"], {
      absolute: true,
      cwd: Environment.Base
    })
  ].sort()
);
export {
  Git_default as default
};
