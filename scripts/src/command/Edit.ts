import ENV from "../lib/Env.js";
import Request from "../lib/Request.js";

export default async (repositories: string[] | Set<string> = []) => {
	const user = ENV.GITHUB_USER;

	const orgs: {
		name: string;
	}[] = [];

	const repos: {
		owner: string;
		name: string;
	}[] = [];

	for (const repo of (await Request(`GET /users/${user}/repos`))?.data) {
		repos.push({
			owner: user,
			name: repo.name,
		});
	}

	for (const org of (await Request(`GET /users/${user}/orgs`))?.data) {
		orgs.push({
			name: org.login,
		});

		for (const repo of (await Request(`GET /orgs/${org.login}/repos`))
			.data) {
			repos.push({
				owner: org.login,
				name: repo.name,
			});
		}
	}

	// start: orgs
	for (const org of orgs) {
		// start: actions/permissions
		await Request(`PUT /orgs/${org.name}/actions/permissions`, {
			org: org.name,
			enabled_repositories: "all",
			allowed_actions: "all",
		});
		// end: actions/permissions

		// actions/permissions/workflow
		await Request(`PUT /orgs/${org.name}/actions/permissions/workflow`, {
			org: org.name,
			default_workflow_permissions: "write",
			can_approve_pull_request_reviews: true,
		});
		// end: actions/permissions/workflow
	}
	// end: orgs

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
			// start: vulnerability-alerts
			await Request(
				`PUT /repos/${repo.owner}/${repo.name}/vulnerability-alerts`
			);
			// end: vulnerability-alerts

			// start: automated-security-fixes
			await Request(
				`PUT /repos/${repo.owner}/${repo.name}/automated-security-fixes`
			);
			// end: automated-security-fixes

			// start: patch
			await Request(`PATCH /repos/${repo.owner}/${repo.name}`, {
				has_issues: true,
				has_projects: false,
				has_wiki: false,
				allow_squash_merge: true,
				allow_merge_commit: true,
				allow_rebase_merge: false,
				allow_auto_merge: true,
				delete_branch_on_merge: true,
				allow_update_branch: true,
				use_squash_pr_title_as_default: true,
				allow_forking: true,
				web_commit_signoff_required: true,
			});
			// end: patch

			// start: actions/permissions
			await Request(
				`PUT /repos/${repo.owner}/${repo.name}/actions/permissions`,
				{
					enabled: true,
					allowed_actions: "all",
				}
			);
			// end: actions/permissions

			// start: actions/permissions/workflow
			await Request(
				`PUT /repos/${repo.owner}/${repo.name}/actions/permissions/workflow`,
				{
					default_workflow_permissions: "write",
					can_approve_pull_request_reviews: true,
				}
			);
			// end: actions/permissions/workflow

			// start: starred
			await Request(`PUT /user/starred/${repo.owner}/${repo.name}`);
			// end: starred

			// start: actions/permissions/access
			await Request(
				`PUT /repos/${repo.owner}/${repo.name}/actions/permissions/access`,
				{
					access_level: "organization",
				}
			);
			// end: actions/permissions/access
		}
	}
	// end: repos
};
