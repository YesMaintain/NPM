import Glob from "fast-glob";
import Environment from "./Environment.js";

export default async () =>
	new Set<string>(
		[
			...(await Glob(["**/.git"], {
				absolute: true,
				cwd: Environment.Base,
			})),
		].sort()
	);
