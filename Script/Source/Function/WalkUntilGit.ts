/**
 * @module WalkUntilGit
 *
 */
export const _Function = (async (...[Search, From]: Parameters<Type>) => {
	const Path = (await import("node:path")).dirname(Search);
	const Original = From ?? Path;

	if (Path === Search) {
		return Original;
	}

	try {
		await (await import("node:fs/promises")).access(
			`${Path}/.git`,
			(await import("node:fs/promises")).constants.R_OK,
		);

		return Path;
	} catch (_Error) {
		return await _Function(Path, Original);
	}
}) satisfies Type as Type;

export default _Function;

import type Type from "../Interface/WalkUntilGit";
