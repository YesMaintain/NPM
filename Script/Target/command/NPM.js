import{constants as g}from"fs";import{access as k,mkdir as u,readFile as d,rm as h,writeFile as O}from"fs/promises";import{dirname as N}from"path";import b from"../Library/Directory.ts";import P from"../Library/Package.ts";import v from"../Library/Type.ts";import F from"../Option/NPM.js";const _=async m=>{for(const{Path:o,Name:r,Workflow:w}of m)for(const[n,y]of await b(await P("npm"))){const t=`${n}/.github`,c=await w();if(o==="/workflows/"&&r==="NPM.yml")for(const a of y){const s=N(a).replace(n,""),$=(await d(a,"utf-8")).toString(),p=(await v()).get(a.split("/").pop());if(typeof p<"u"&&p==="npm")try{const e=JSON.parse($);for(const i in e)if(Object.prototype.hasOwnProperty.call(e,i)){const l=e[i];if(i==="scripts")for(const f in l)Object.prototype.hasOwnProperty.call(l,f)&&f==="prepublishOnly"&&c.add(`
            - name: Publish .${s}
              continue-on-error: true
              working-directory: .${s}
              run: |
                  npm install --legacy-peer-deps
                  npm publish --legacy-peer-deps --provenance
              env:
                  NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
`)}}catch(e){console.log(a),console.log(e)}}if(c.size>1){try{await u(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await O(`${t}${o}${r}`,`${[...c].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/NPM.yml`)}}else try{await k(`${t}${o}${r}`,g.F_OK);try{await h(`${t}${o}${r}`)}catch{console.log(`Could not remove ${o}${r} for: ${t}`)}}catch{}}};var M=async()=>await _(F);export{M as default};
