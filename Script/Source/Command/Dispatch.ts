import Environment from "../Library/Environment.js";
import Request from "../Library/Request.js";

export default async (repositories: string[] | Set<string> = []) => {
	const User = Environment.User;

	const Organizations: {
		name: string;
	}[] = [];

	const Repositories: {
		owner: string;
		name: string;
	}[] = [];

	for (const repo of (await Request(`GET /users/${User}/repos`))?.data) {
		Repositories.push({
			owner: User,
			name: repo.name,
		});
	}

	for (const org of (await Request(`GET /users/${User}/orgs`))?.data) {
		Organizations.push({
			name: org.login,
		});

		for (const repo of (await Request(`GET /orgs/${org.login}/repos`))
			?.data) {
			Repositories.push({
				owner: org.login,
				name: repo.name,
			});
		}
	}

	// start: repos
	let pass: boolean | undefined = undefined;

	for (const repo of Repositories) {
		/* Checking if the repository is in the list of repositories. */
		for (const repository of repositories) {
			if (repo.name === repository) {
				pass = true;
			} else {
				pass = false;
			}
		}

		if (typeof pass === "undefined" || pass) {
			// start: actions/workflows
			for (const workflow of (
				await Request(
					`GET /repos/${repo.owner}/${repo.name}/actions/workflows`,
					{ owner: repo.owner, repo: repo.name }
				)
			)?.data?.workflows) {
				await Request(
					`POST /repos/${repo.owner}/${repo.name}/actions/workflows/${workflow.id}/dispatches`,
					{
						ref: "main",
					}
				);
			}
			// end: actions/workflows
		}
	}
	// end: repos
};
