import { Octokit } from "@octokit/core";
import type { OctokitResponse } from "@octokit/types";
import { deepmerge } from "deepmerge-ts";
import etag from "etag";
import env from "../lib/env.js";

const octokit = new Octokit({
	auth: env.GH_AUTH_TOKEN,
});

export default async (
	where: string,
	_with: {} = {},
	type = "octokit"
	// rome-ignore lint/suspicious/noExplicitAny:
): Promise<OctokitResponse<any, number> | void> => {
	try {
		console.log(`Successfully ${where}`);

		switch (type) {
			case "octokit": {
				return await octokit.request(
					where,
					deepmerge(_with, {
						headers: {
							"If-None-Match": etag(where),
						},
					})
				);
			}
		}
	} catch (_e) {
		console.log(_e);
		console.log(`Could not ${where}`);
	}
};
