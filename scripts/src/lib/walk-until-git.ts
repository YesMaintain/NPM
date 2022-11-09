import * as fs from "fs";
import { dirname } from "path";

const walkUntilGit = async (
	search: string,
	startedFrom?: string,
): Promise<string> => {
	const path = dirname(search);
	const originalPath = startedFrom ? startedFrom : path;

	if (path === search) {
		return originalPath;
	}

	return fs.existsSync(`${path}/.git`)
		? path
		: await walkUntilGit(path, originalPath);
};

export default walkUntilGit;
