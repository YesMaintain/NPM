import i from"../lib/Env.js";import r from"../lib/Request.js";var m=async(t=[])=>{const s=i.GITHUB_USER,f=[],a=[];for(const o of(await r(`GET /users/${s}/repos`))?.data)a.push({owner:s,name:o.name});for(const o of(await r(`GET /users/${s}/orgs`))?.data){f.push({name:o.login});for(const e of(await r(`GET /orgs/${o.login}/repos`))?.data)a.push({owner:o.login,name:e.name})}let n;for(const o of a){for(const e of t)o.name===e?n=!0:n=!1;if(typeof n>"u"||n)for(const e of(await r(`GET /repos/${o.owner}/${o.name}/actions/workflows`,{owner:o.owner,repo:o.name}))?.data?.workflows)await r(`POST /repos/${o.owner}/${o.name}/actions/workflows/${e.id}/dispatches`,{ref:"main"})}};export{m as default};
