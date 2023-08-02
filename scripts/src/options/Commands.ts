import type { CommandOptions } from "commander";

const commands: Set<{
	name: string;
	opts?: CommandOptions;
	type?: "workflow";
	description?: string;
	arguments?: Set<{
		name: string;
		description?: string;
		// rome-ignore lint/suspicious/noExplicitAny:
		defaultValue?: any;
	}>;
	// rome-ignore lint/suspicious/noExplicitAny:
	action: (...args: any[]) => Promise<void>;
}> = new Set([
	{
		name: "clean",
		description: "Clean GitHub repositories",
		arguments: new Set([
			{
				name: "[repositories...]",
				description: "Repositories to clean.",
			},
		]),
		action: (await import("../command/Clean.js")).default,
	},
	{
		name: "dispatch",
		description: "Trigger dispatch events.",
		arguments: new Set([
			{
				name: "[repositories...]",
				description:
					"Repositories on which to trigger dispatch events.",
			},
		]),
		action: (await import("../command/Dispatch.js")).default,
	},
	{
		name: "dependabot",
		type: "workflow",
		description: "Put Dependabot everywhere.",
		action: (await import("../command/Dependabot.js")).default,
	},
	{
		name: "edit",
		arguments: new Set([
			{
				name: "[repositories...]",
				description: "Repositories to edit.",
			},
		]),
		description: "Edit features for all repositories.",
		action: (await import("../command/Edit.js")).default,
	},
	{
		name: "node",
		type: "workflow",
		description: "Put node into GitHub Actions.",
		action: (await import("../command/Node.js")).default,
	},
	{
		name: "npm",
		type: "workflow",
		description: "Put NPM into GitHub Actions.",
		action: (await import("../command/NPM.js")).default,
	},
	{
		name: "rust",
		type: "workflow",
		description: "Put rust into GitHub Actions.",
		action: (await import("../command/Rust.js")).default,
	},
	{
		name: "workflows",
		description: "Trigger all workflow tasks.",
		action: async () => {
			commands.forEach((command) => {
				if (command.type === "workflow") {
					command.action();
				}
			});
		},
	},
	{
		name: "star",
		description: "Star all my used repositories.",
		action: (await import("../command/Star.js")).default,
	},
]);

export default commands;
