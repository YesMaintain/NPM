import { Command as r } from "commander";
import t from "./options/commands.js";
const o=new r;o.name("maintenance").description("Maintenance tools"),t?.forEach(n=>{const i=o.command(n.name).description(typeof n.description<"u"?n.description:"").action(n.action);n.arguments?.forEach(e=>{i.argument(e.name,e.description)})}),o.parse();
