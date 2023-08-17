import { Command } from "commander";
import Commands from "./Option/Command.js";

const Program = new Command();

Program.name("Maintenance").description("Maintenance tools");

Commands?.forEach((Command) => {
	const _Program = Program.command(Command.Name)
		.description(
			typeof Command.Description !== "undefined"
				? Command.Description
				: ""
		)
		.action(Command.Action);

	Command.Arguments?.forEach((argument) => {
		_Program.argument(argument.Name, argument.Description);
	});
});

Program.parse();
