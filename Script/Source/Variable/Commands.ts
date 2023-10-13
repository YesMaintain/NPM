import type { CommandOptions } from "commander";

export const _Object: Set<{
	Name: string;
	Opts?: CommandOptions;
	Type?: "Workflow";
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
		Name: "Clean",
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
		Name: "Dispatch",
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
		Name: "Dependabot",
		Type: "Workflow",
		Description: "Put Dependabot everywhere.",
		Action: (await import("../Command/Dependabot.js")).default,
	},
	{
		Name: "Edit",
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
		Name: "Node",
		Type: "Workflow",
		Description: "Put Node into GitHub Actions.",
		Action: (await import("../Command/Node.js")).default,
	},
	{
		Name: "Cloudflare",
		Type: "Workflow",
		Description: "Put Cloudflare into GitHub Actions.",
		Action: (await import("../Command/Cloudflare.js")).default,
	},
	{
		Name: "NPM",
		Type: "Workflow",
		Description: "Put NPM into GitHub Actions.",
		Action: (await import("../Command/NPM.js")).default,
	},
	{
		Name: "Rust",
		Type: "Workflow",
		Description: "Put rust into GitHub Actions.",
		Action: (await import("../Command/Rust.js")).default,
	},
	{
		Name: "Workflow",
		Description: "Trigger all workflow tasks.",
		Action: async () =>
			_Object.forEach((Command) =>
				Command.Type === "Workflow" ? Command.Action() : {}
			),
	},
	{
		Name: "Star",
		Description: "Star all my used repositories.",
		Action: (await import("../Command/Star.js")).default,
	},
]);

export default _Object;
