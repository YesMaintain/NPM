"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var Command_js_1 = require("./Option/Command.js");
var Program = new commander_1.Command();
Program.name("Maintain").description("Maintains GitHub repositories");
Command_js_1.default === null || Command_js_1.default === void 0 ? void 0 : Command_js_1.default.forEach(function (Command) {
    var _a;
    var _Program = Program.command(Command.Name)
        .description(typeof Command.Description !== "undefined"
        ? Command.Description
        : "")
        .action(Command.Action);
    (_a = Command.Arguments) === null || _a === void 0 ? void 0 : _a.forEach(function (argument) {
        _Program.argument(argument.Name, argument.Description);
    });
});
Program.parse();
