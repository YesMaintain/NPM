import Glob from "fast-glob";
import Environment from "./Environment.ts";

export default async () =>
	new Set<string>(
		[
			...(await Glob(["**/README.md"], {
				absolute: true,
				cwd: Environment.Base,
			})),
		].sort()
	);
