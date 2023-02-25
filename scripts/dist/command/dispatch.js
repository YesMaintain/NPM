import i from "../lib/env.js";
import r from "../lib/request.js";
const p=async(t=[])=>{const n=i.GITHUB_USER,f=[],a=[];for(const o of(await r(`GET /users/${n}/repos`))?.data)a.push({owner:n,name:o.name});for(const o of(await r(`GET /users/${n}/orgs`))?.data){f.push({name:o.login});for(const e of(await r(`GET /orgs/${o.login}/repos`))?.data)a.push({owner:o.login,name:e.name})}let s;for(const o of a){for(const e of t)o.name===e?s=!0:s=!1;if(typeof s>"u"||s)for(const e of(await r(`GET /repos/${o.owner}/${o.name}/actions/workflows`,{owner:o.owner,repo:o.name}))?.data?.workflows)await r(`POST /repos/${o.owner}/${o.name}/actions/workflows/${e.id}/dispatches`,{ref:"main"})}};var c=p;export { c as default };

