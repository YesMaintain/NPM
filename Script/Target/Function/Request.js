import Environment from "../Library/Environment.js";
import { Octokit } from "@octokit/core";
import { deepmerge as Merge } from "deepmerge-ts";
import Tag from "etag";
const OCTOKIT = new Octokit({
  auth: Environment.Token
});
var Request_default = async (Where, With = {}, Type = "octokit") => {
  try {
    console.log(`Successfully ${Where}`);
    switch (Type) {
      case "octokit": {
        return await OCTOKIT.request(
          Where,
          Merge(With, {
            headers: {
              "If-None-Match": Tag(Where)
            }
          })
        );
      }
    }
  } catch (_Error) {
  }
};
export {
  Request_default as default
};
