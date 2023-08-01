import p from"../lib/Env.js";import n from"../lib/Request.js";const t=p.GITHUB_USER,m=[],i=[];var E=async(f=[])=>{const c=await n(`GET /users/${t}/repos`);if(c)for(const o of c.data)i.push({owner:t,name:o.name});const w=await n(`GET /users/${t}/orgs`);if(w)for(const o of w.data){m.push({name:o.login});const e=await n(`GET /orgs/${o.login}/repos`);if(e)for(const a of e.data)i.push({owner:o.login,name:a.name})}let s=null;for(const o of i){for(const e of f)o.name===e?s=!0:s=!1;if(s===null||s){const e=await n(`GET /repos/${o.owner}/${o.name}/actions/runs`,{owner:o.owner,repo:o.name});if(e)for(const r of e?.data?.workflow_runs)await n(`DELETE /repos/${o.owner}/${o.name}/actions/runs/${r.id}`,{owner:o.owner,repo:o.name,run_id:r.id}),await n(`DELETE /repos/${o.owner}/${o.name}/actions/runs/${r.id}/logs`,{owner:o.owner,repo:o.name,run_id:r.id});const a=await n(`GET /repos/${o.owner}/${o.name}/actions/caches`,{owner:o.owner,repo:o.name});if(a)for(const r of a?.data?.actions_caches)await n(`DELETE /repos/${o.owner}/${o.name}/actions/caches/${r.id}`,{owner:o.owner,repo:o.name,cache_id:r.id})}}};export{E as default};
