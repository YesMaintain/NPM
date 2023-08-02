import { constants as Constant } from "fs";
import { access as Access } from "fs/promises";
import { dirname as Dir } from "path";

const WalkUntilGit = async (Search: string, From?: string): Promise<string> => {
	const path = Dir(Search);
	const originalPath = From ? From : path;

	if (path === Search) {
		return originalPath;
	}

	try {
		await Access(`${path}/.git`, Constant.R_OK | Constant.W_OK);
		return path;
	} catch (error) {
		return await WalkUntilGit(path, originalPath);
	}
};

export default WalkUntilGit;
