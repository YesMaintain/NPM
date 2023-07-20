import { constants } from "fs";
import { access } from "fs/promises";
import { dirname } from "path";

const walkUntilGit = async (
	search: string,
	startedFrom?: string
): Promise<string> => {
	const path = dirname(search);
	const originalPath = startedFrom ? startedFrom : path;

	if (path === search) {
		return originalPath;
	}

	try {
		await access(`${path}/.git`, constants.R_OK | constants.W_OK);
		return path;
	} catch (error) {
		return await walkUntilGit(path, originalPath);
	}
};

export default walkUntilGit;
