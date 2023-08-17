import type { CommandOptions as Options } from "commander";

const Commands: Set<{
	Name: string;
	Opts?: Options;
	Type?: "Flow";
	Description?: string;
	Arguments?: Set<{
		Name: string;
		Description?: string;
		// rome-ignore lint/suspicious/noExplicitAny:
		Value?: any;
	}>;
	// rome-ignore lint/suspicious/noExplicitAny:
	Action: (...args: any[]) => Promise<void>;
}> = new Set([
	{
		Name: "clean",
		Description: "Clean GitHub repositories",
		Arguments: new Set([
			{
				Name: "[repositories...]",
				Description: "Repositories to clean.",
			},
		]),
		Action: (await import("../Command/Clean.js")).default,
	},
	{
		Name: "dispatch",
		Description: "Trigger dispatch events.",
		Arguments: new Set([
			{
				Name: "[repositories...]",
				Description:
					"Repositories on which to trigger dispatch events.",
			},
		]),
		Action: (await import("../Command/Dispatch.js")).default,
	},
	{
		Name: "dependabot",
		Type: "Flow",
		Description: "Put Dependabot everywhere.",
		Action: (await import("../Command/Dependabot.js")).default,
	},
	{
		Name: "edit",
		Arguments: new Set([
			{
				Name: "[repositories...]",
				Description: "Repositories to edit.",
			},
		]),
		Description: "Edit features for all repositories.",
		Action: (await import("../Command/Edit.js")).default,
	},
	{
		Name: "node",
		Type: "Flow",
		Description: "Put node into GitHub Actions.",
		Action: (await import("../Command/NODE.ts")).default,
	},
	{
		Name: "npm",
		Type: "Flow",
		Description: "Put NPM into GitHub Actions.",
		Action: (await import("../Command/NPM.js")).default,
	},
	{
		Name: "rust",
		Type: "Flow",
		Description: "Put rust into GitHub Actions.",
		Action: (await import("../Command/Rust.js")).default,
	},
	{
		Name: "workflows",
		Description: "Trigger all workflow tasks.",
		Action: async () =>
			Commands.forEach((Command) =>
				Command.Type === "Flow" ? Command.Action() : {}
			),
	},
	{
		Name: "star",
		Description: "Star all my used repositories.",
		Action: (await import("../Command/Star.js")).default,
	},
]);

export default Commands;
