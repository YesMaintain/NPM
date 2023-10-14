#!/usr/bin/env node
const Program = new (await import("commander")).Command().name("Maintain").description("Maintains GitHub repositories").version("0.0.1");
(await import("../Variable/Commands.js")).default?.forEach(
  ({ Action, Name, Description, Arguments }) => {
    const _Program = Program.command(Name).description(typeof Description !== "undefined" ? Description : "").action(Action);
    Arguments?.forEach((Argument) => {
      _Program.argument(Argument.Name, Argument.Description);
    });
  }
);
var YesMaintain_default = Program.parse();
export {
  YesMaintain_default as default
};
