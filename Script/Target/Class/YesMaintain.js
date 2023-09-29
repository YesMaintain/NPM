#!/usr/bin/env node
import { Command } from "commander";
import Commands from "./Option/Command.js";
const Program = new Command();
Program.name("Maintain").description("Maintains GitHub repositories");
Commands?.forEach((Command2) => {
  const _Program = Program.command(Command2.Name).description(
    typeof Command2.Description !== "undefined" ? Command2.Description : ""
  ).action(Command2.Action);
  Command2.Arguments?.forEach((argument) => {
    _Program.argument(argument.Name, argument.Description);
  });
});
Program.parse();
