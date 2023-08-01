import env from "../lib/env.js";
import request from "../lib/request.js";

const user = env.GITHUB_USER;

const orgs: {
	name: string;
}[] = [];

const repos: {
	owner: string;
	name: string;
}[] = [];

export default async (repositories: string[] = []) => {
	const get = await request(`GET /users/${user}/repos`);

	if (get) {
		for (const repo of get.data) {
			repos.push({
				owner: user,
				name: repo.name,
			});
		}
	}

	const getOrg = await request(`GET /users/${user}/orgs`);

	if (getOrg) {
		for (const org of getOrg.data) {
			orgs.push({
				name: org.login,
			});

			const reposOrg = await request(`GET /orgs/${org.login}/repos`);

			if (reposOrg) {
				for (const repo of reposOrg.data) {
					repos.push({
						owner: org.login,
						name: repo.name,
					});
				}
			}
		}
	}

	// start: repos
	let pass = null;

	for (const repo of repos) {
		for (const repository of repositories) {
			if (repo.name === repository) {
				pass = true;
			} else {
				pass = false;
			}
		}

		if (pass === null || pass) {
			const runs = await request(
				`GET /repos/${repo.owner}/${repo.name}/actions/runs`,
				{
					owner: repo.owner,
					repo: repo.name,
				}
			);

			if (runs) {
				// start: actions/runs
				for (const run of runs?.data?.workflow_runs) {
					await request(
						`DELETE /repos/${repo.owner}/${repo.name}/actions/runs/${run.id}`,
						{ owner: repo.owner, repo: repo.name, run_id: run.id }
					);

					await request(
						`DELETE /repos/${repo.owner}/${repo.name}/actions/runs/${run.id}/logs`,
						{ owner: repo.owner, repo: repo.name, run_id: run.id }
					);
				}
				// end: actions/runs
			}

			const caches = await request(
				`GET /repos/${repo.owner}/${repo.name}/actions/caches`,
				{
					owner: repo.owner,
					repo: repo.name,
				}
			);

			if (caches) {
				// start: actions/caches
				for (const cache of caches?.data?.actions_caches) {
					await request(
						`DELETE /repos/${repo.owner}/${repo.name}/actions/caches/${cache.id}`,
						{
							owner: repo.owner,
							repo: repo.name,
							cache_id: cache.id,
						}
					);
				}
				// end: actions/caches
			}
		}
	}
	// end: repos
};
