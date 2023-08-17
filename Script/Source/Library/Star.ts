import { Octokit } from "@octokit/core";
import Environment from "../Library/Environment.js";

const OCTOKIT = new Octokit({
	auth: Environment.Token,
});

export default async (URL = "") => {
	if (typeof URL !== "string") {
		return;
	}

	URL = URL?.replace("git://", "https://")
		?.replace("https://github.com/", "")
		?.replace("git+", "")
		?.replace(".git", "");

	// start: starred
	try {
		await OCTOKIT.request(`PUT /user/starred/${URL}`);

		console.log(`Starred repository: ${URL}`);
	} catch (_Error) {
		console.log(`Could not star repository: ${URL}`);
	}
	// end: starred
};
