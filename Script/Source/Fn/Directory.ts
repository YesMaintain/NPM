/**
 * The function `Directory` takes a set of file globs, walks through the directories
 * until it finds a Git repository, and returns a map where the keys are the directories
 * and the values are sets of globs associated with each directory.
 * @param {Set<string>} Search is a Set of strings representing file globs. A file glob is a
 * pattern used to match file paths. For example, "*.js" would match all JavaScript
 * files in a directory. The Search parameter is a set of these file globs that will be
 * used to search for files in
 * @returns The function `Directory` returns a `Map` object where the keys are directory
 * paths and the values are sets of glob patterns associated with each directory.
 */
export default async (Search: Set<string>) => {
	const Results = new Map();

	Search.forEach(async (Search) => {
		const Directory = await (
			await import("./WalkUntilGit.js")
		).default(Search);

		Results.set(
			Directory,
			Results.has(Directory)
				? Results.get(Directory).add(Search)
				: new Set<string>([Search].sort())
		);
	});

	return Results;
};
