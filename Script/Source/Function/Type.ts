/**
 * @module Type
 *
 */
export default ((async (...[Filter = false]: Parameters<Type>) => {
	const Result = new Map<string, Package>();

	Result.set("package.json", "NPM");
	Result.set("Cargo.toml", "Cargo");
	Result.set("composer.json", "Composer");
	Result.set("packages.config", "Nuget");
	Result.set("*.csproj", "Nuget");
	Result.set("wrangler.toml", "Cloudflare");
	Result.set("requirements.txt", "Python");

	if (Filter) {
		Result.forEach((value, key) => {
			if (value !== Filter) {
				Result.delete(key);
			}
		});
	}

	return Result;
}) satisfies Type as Type);

import type Type from "../Interface/Type.js";
import type Package from "../Type/Package.js";
