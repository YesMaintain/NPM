import { Octokit } from "@octokit/core";
import { deepmerge as Merge } from "deepmerge-ts";
import Tag from "etag";

const OCTOKIT = new Octokit({
	auth: (await import("../Variable/Environment.js")).default.parse(
		process.env
	).Token,
});

export default async (
	Where: string,
	With = {},
	Type = "octokit"
	// biome-ignore lint/suspicious/noExplicitAny:
): Promise<OctokitResponse<any, number> | void> => {
	try {
		console.log(`Successfully ${Where}`);

		switch (Type) {
			case "octokit": {
				return await OCTOKIT.request(
					Where,
					Merge(With, {
						headers: {
							"If-None-Match": Tag(Where),
						},
					})
				);
			}
		}
	} catch (_Error) {}
};

import type { OctokitResponse } from "@octokit/types";
