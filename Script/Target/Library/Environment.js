import*as r from"dotenv";import{cwd as t}from"process";import{z as e}from"zod";r.config();var f=e.object({User:e.string().default(""),Base:e.string().default(t()),Token:e.string().default("")}).parse(process.env);export{f as default};
