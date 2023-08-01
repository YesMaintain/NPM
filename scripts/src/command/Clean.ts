import ENV from "../lib/Env.js";
import Request from "../lib/Request.js";

const user = ENV.GITHUB_USER;

const orgs: {
	name: string;
}[] = [];

const repos: {
	owner: string;
	name: string;
}[] = [];

export default async (repositories: string[] = []) => {
	const get = await Request(`GET /users/${user}/repos`);

	if (get) {
		for (const repo of get.data) {
			repos.push({
				owner: user,
				name: repo.name,
			});
		}
	}

	const getOrg = await Request(`GET /users/${user}/orgs`);

	if (getOrg) {
		for (const org of getOrg.data) {
			orgs.push({
				name: org.login,
			});

			const reposOrg = await Request(`GET /orgs/${org.login}/repos`);

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
			const runs = await Request(
				`GET /repos/${repo.owner}/${repo.name}/actions/runs`,
				{
					owner: repo.owner,
					repo: repo.name,
				}
			);

			if (runs) {
				// start: actions/runs
				for (const run of runs?.data?.workflow_runs) {
					await Request(
						`DELETE /repos/${repo.owner}/${repo.name}/actions/runs/${run.id}`,
						{ owner: repo.owner, repo: repo.name, run_id: run.id }
					);

					await Request(
						`DELETE /repos/${repo.owner}/${repo.name}/actions/runs/${run.id}/logs`,
						{ owner: repo.owner, repo: repo.name, run_id: run.id }
					);
				}
				// end: actions/runs
			}

			const caches = await Request(
				`GET /repos/${repo.owner}/${repo.name}/actions/caches`,
				{
					owner: repo.owner,
					repo: repo.name,
				}
			);

			if (caches) {
				// start: actions/caches
				for (const cache of caches?.data?.actions_caches) {
					await Request(
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
