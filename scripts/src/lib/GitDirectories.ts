import walkUntilGit from "./WalkUntilGit.js";

export default async (globs: Set<string>) => {
	const results = new Map();

	for (const glob of globs) {
		const gitDir = await walkUntilGit(glob);

		if (results.has(gitDir)) {
			results.set(gitDir, results.get(gitDir).add(glob));
		} else {
			results.set(gitDir, new Set<string>([glob].sort()));
		}
	}

	return results;
};
