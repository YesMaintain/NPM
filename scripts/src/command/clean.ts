import request from "../lib/request.js";
import env from "../lib/env.js";

const user = env.GITHUB_USER;

const orgs: {
	name: string;
}[] = [];

const repos: {
	owner: string;
	name: string;
}[] = [];
/**
 * It deletes all GitHub Actions logs and runs for all of your repositories
 */
const clean = async () => {
	for (const repo of (await request(`GET /users/${user}/repos`)).data) {
		repos.push({
			owner: user,
			name: repo.name,
		});
	}

	for (const org of (await request(`GET /users/${user}/orgs`)).data) {
		orgs.push({
			name: org.login,
		});

		for (const repo of (await request(`GET /orgs/${org.login}/repos`))
			.data) {
			repos.push({
				owner: org.login,
				name: repo.name,
			});
		}
	}

	// start: repos
	for (const repo of repos) {
		// start: actions/caches
		for (const cache of (
			await request(
				`GET /repos/${repo.owner}/${repo.name}/actions/caches`,
				{ owner: repo.owner, repo: repo.name }
			)
		).data.actions_caches) {
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

		// start: actions/runs
		for (const run of (
			await request(
				`GET /repos/${repo.owner}/${repo.name}/actions/runs`,
				{ owner: repo.owner, repo: repo.name }
			)
		).data.workflow_runs) {
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
	// end: repos
};

export default clean;
