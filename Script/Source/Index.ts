import { Command } from "commander";
import Commands from "./Option/Command.ts";

const program = new Command();

program.name("Maintenance").description("Maintenance tools");

Commands?.forEach((Command) => {
	const Program = program
		.command(Command.Name)
		.description(
			typeof Command.Description !== "undefined"
				? Command.Description
				: ""
		)
		.action(Command.Action);

	Command.Arguments?.forEach((argument) => {
		Program.argument(argument.Name, argument.Description);
	});
});

program.parse();
