import { Octokit } from "@octokit/core";
import type { OctokitResponse } from "@octokit/types";
import { deepmerge as Merge } from "deepmerge-ts";
import Tag from "etag";
import Environment from "../Library/Environment.js";

const OCTOKIT = new Octokit({
	auth: Environment.Token,
});

export default async (
	Where: string,
	With: {} = {},
	Type = "octokit"
	// rome-ignore lint/suspicious/noExplicitAny:
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
	} catch (_Error) {
		console.log(_Error);
		console.log(`Could not ${Where}`);
	}
};
