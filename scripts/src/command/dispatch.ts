import env from "./../lib/env.js";
import request from "./../lib/request.js";

/**
 * It gets all the repositories of the user and dispatches all the workflows of the repositories
 * @param {string[] | Set<string>} repositories - string[] | Set<string> = []
 */
const dispatch = async (repositories: string[] | Set<string> = []) => {
	const user = env.GITHUB_USER;

	const orgs: {
		name: string;
	}[] = [];

	const repos: {
		owner: string;
		name: string;
	}[] = [];

	for (const repo of (await request(`GET /users/${user}/repos`))?.data) {
		repos.push({
			owner: user,
			name: repo.name,
		});
	}

	for (const org of (await request(`GET /users/${user}/orgs`))?.data) {
		orgs.push({
			name: org.login,
		});

		for (const repo of (await request(`GET /orgs/${org.login}/repos`))
			?.data) {
			repos.push({
				owner: org.login,
				name: repo.name,
			});
		}
	}

	// start: repos
	let pass;

	for (const repo of repos) {
		/* Checking if the repository is in the list of repositories. */
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
				await request(
					`GET /repos/${repo.owner}/${repo.name}/actions/workflows`,
					{ owner: repo.owner, repo: repo.name }
				)
			)?.data?.workflows) {
				await request(
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

export default dispatch;
