import WalkUntilGit from "./WalkUntilGit.ts";

export default async (Globs: Set<string>) => {
	const Results = new Map();

	for (const Glob of Globs) {
		const Dir = await WalkUntilGit(Glob);

		if (Results.has(Dir)) {
			Results.set(Dir, Results.get(Dir).add(Glob));
		} else {
			Results.set(Dir, new Set<string>([Glob].sort()));
		}
	}

	return Results;
};
