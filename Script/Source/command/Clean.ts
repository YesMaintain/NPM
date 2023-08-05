import Environment from "../Library/Environment.js";
import Request from "../Library/Request.js";

const User = Environment.GITHUB_USER;

const All: {
	Organizations: {
		Name: string;
	}[];
	Repositories: {
		Owner: string;
		Name: string;
	}[];
} = {
	Organizations: [],
	Repositories: [],
};

export default async (Repositories: string[] = []) => {
	const Get = await Request(`GET /users/${User}/repos`);

	if (Get) {
		for (const Repository of Get.data) {
			All.Repositories.push({
				Owner: User,
				Name: Repository.name,
			});
		}
	}

	const Organizations = await Request(`GET /users/${User}/orgs`);

	if (Organizations) {
		for (const Organization of Organizations.data) {
			All.Organizations.push({
				Name: Organization.login,
			});

			const Repositories = await Request(
				`GET /orgs/${Organization.login}/repos`
			);

			if (Repositories) {
				for (const repo of Repositories.data) {
					All.Repositories.push({
						Owner: Organization.login,
						Name: repo.name,
					});
				}
			}
		}
	}

	// start: repos
	let Pass = null;

	for (const Repository of All.Repositories) {
		for (const _Repository of Repositories) {
			if (Repository.Name === _Repository) {
				Pass = true;
			} else {
				Pass = false;
			}
		}

		if (Pass === null || Pass) {
			const Runs = await Request(
				`GET /repos/${Repository.Owner}/${Repository.Name}/actions/runs`,
				{
					owner: Repository.Owner,
					repo: Repository.Name,
				}
			);

			if (Runs?.data?.workflow_runs) {
				// start: actions/runs
				for (const run of Runs.data.workflow_runs) {
					await Request(
						`DELETE /repos/${Repository.Owner}/${Repository.Name}/actions/runs/${run.id}`,
						{
							owner: Repository.Owner,
							repo: Repository.Name,
							run_id: run.id,
						}
					);

					await Request(
						`DELETE /repos/${Repository.Owner}/${Repository.Name}/actions/runs/${run.id}/logs`,
						{
							owner: Repository.Owner,
							repo: Repository.Name,
							run_id: run.id,
						}
					);
				}
				// end: actions/runs
			}

			const Caches = await Request(
				`GET /repos/${Repository.Owner}/${Repository.Name}/actions/caches`,
				{
					owner: Repository.Owner,
					repo: Repository.Name,
				}
			);

			if (Caches?.data?.actions_caches) {
				// start: actions/caches
				for (const Cache of Caches.data.actions_caches) {
					await Request(
						`DELETE /repos/${Repository.Owner}/${Repository.Name}/actions/caches/${Cache.id}`,
						{
							owner: Repository.Owner,
							repo: Repository.Name,
							cache_id: Cache.id,
						}
					);
				}
				// end: actions/caches
			}
		}
	}
	// end: repos
};
