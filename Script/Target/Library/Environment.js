"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var process_1 = require("process");
var zod_1 = require("zod");
(0, dotenv_1.config)();
exports.default = zod_1.z
    .object({
    User: zod_1.z.string().default(""),
    Base: zod_1.z.string().default((0, process_1.cwd)()),
    Token: zod_1.z.string().default(""),
})
    .parse(process.env);
