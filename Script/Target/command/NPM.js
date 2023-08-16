import{constants as g}from"fs";import{access as u,mkdir as k,readFile as d,rm as h,writeFile as O}from"fs/promises";import{dirname as N}from"path";import b from"../Library/Directory.ts";import P from"../Library/Package.ts";import v from"../Library/Type.ts";import C from"../Option/NPM.js";const F=async m=>{for(const{Path:o,Name:r,Flow:w}of m)for(const[c,y]of await b(await P("npm"))){const t=`${c}/.github`,i=await w();if(o==="/workflows/"&&r==="NPM.yml")for(const a of y){const s=N(a).replace(c,""),$=(await d(a,"utf-8")).toString(),p=(await v()).get(a.split("/").pop());if(typeof p<"u"&&p==="npm")try{const e=JSON.parse($);for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)){const l=e[n];if(n==="scripts")for(const f in l)Object.prototype.hasOwnProperty.call(l,f)&&f==="prepublishOnly"&&i.add(`
            - name: Publish .${s}
              continue-on-error: true
              working-directory: .${s}
              run: |
                  npm install --legacy-peer-deps
                  npm publish --legacy-peer-deps --provenance
              env:
                  NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
`)}}catch(e){console.log(a),console.log(e)}}if(i.size>1){try{await k(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await O(`${t}${o}${r}`,`${[...i].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/NPM.yml`)}}else try{await u(`${t}${o}${r}`,g.F_OK);try{await h(`${t}${o}${r}`)}catch{console.log(`Could not remove ${o}${r} for: ${t}`)}}catch{}}};var S=async()=>{await F(C)};export{S as default};
