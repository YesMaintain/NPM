import { constants as Constant } from "fs";
import { access as Access } from "fs/promises";
import { dirname as Dir } from "path";

const WalkUntilGit = async (Search: string, From?: string): Promise<string> => {
	const Path = Dir(Search);
	const Original = From ? From : Path;

	if (Path === Search) {
		return Original;
	}

	try {
		await Access(`${Path}/.git`, Constant.R_OK | Constant.W_OK);
		return Path;
	} catch (_Error) {
		return await WalkUntilGit(Path, Original);
	}
};

export default WalkUntilGit;
