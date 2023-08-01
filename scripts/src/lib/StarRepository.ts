import { Octokit } from "@octokit/core";
import env from "../lib/Env.js";

const octokit = new Octokit({
	auth: env.GH_AUTH_TOKEN,
});

export default async (url = "") => {
	if (typeof url !== "string") {
		return;
	}

	const properUrl = url
		.replace("git://", "https://")
		.replace("https://github.com/", "")
		.replace("git+", "")
		.replace(".git", "");

	// start: starred
	try {
		await octokit.request(`PUT /user/starred/${properUrl}`);

		console.log(`Starred repository: ${properUrl}`);
	} catch (_error) {
		console.log(`Could not star repository: ${properUrl}`);
	}
	// end: starred
};
