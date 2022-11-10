import { Octokit } from "@octokit/core";
import type { OctokitResponse } from "@octokit/types";
import { deepmerge } from "deepmerge-ts";

import env from "../lib/env.js";

const octokit = new Octokit({
	auth: env.GITHUB_AUTH_TOKEN,
});

const request = async (
	where: string,
	_with: {} = {},
	type: string = "octokit"
): Promise<OctokitResponse<any, number> | any> => {
	try {
		console.log(`Successfully ${where}`);

		switch (type) {
			case "octokit": {
				return await octokit.request(
					where,
					deepmerge(_with, {
						headers: {
							"If-None-Match":
								"19a5941476078432824fadaeb04143d60602c3e00dac483c4ddc2f7af86c1e75",
						},
					})
				);
			}
		}
	} catch (e) {
		console.log(`Could not ${where}`);
	}
};

export default request;
