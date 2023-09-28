import { Octokit } from "@octokit/core";
import Environment from "../Library/Environment.js";
const OCTOKIT = new Octokit({
  auth: Environment.Token
});
var Star_default = async (URL = "") => {
  if (typeof URL !== "string") {
    return;
  }
  const _URL = URL?.replace("git://", "https://")?.replace("https://github.com/", "")?.replace("git+", "")?.replace(".git", "");
  try {
    await OCTOKIT.request(`PUT /user/starred/${_URL}`);
    console.log(`Starred repository: ${_URL}`);
  } catch (_Error) {
    console.log(`Could not star repository: ${_URL}`);
  }
};
export {
  Star_default as default
};
