import u from"../Library/Directory.js";import g from"../Library/Package.js";import d from"../Library/Type.js";import k from"../Option/NPM.js";import{constants as h}from"fs";import{access as N,mkdir as F,rm as O,readFile as P,writeFile as _}from"fs/promises";import{dirname as b}from"path";const v=async m=>{for(const{Path:o,Name:t,File:y}of m)for(const[c,w]of await u(await g("NPM"))){const e=`${c}/.github`,r=await y();if(o==="/workflows/"&&t==="NPM.yml")for(const a of w){const n=b(a).replace(c,""),$=(await P(a,"utf-8")).toString(),l=(await d()).get(a.split("/").pop());if(typeof l<"u"&&l==="NPM"){const i=JSON.parse($);for(const s in i)if(Object.prototype.hasOwnProperty.call(i,s)){const p=i[s];if(s==="scripts")for(const f in p)Object.prototype.hasOwnProperty.call(p,f)&&f==="prepublishOnly"&&r.add(`
            - name: Publish .${n}
              continue-on-error: true
              working-directory: .${n}
              run: |
                  npm install --legacy-peer-deps
                  npm publish --legacy-peer-deps --provenance
              env:
                  NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
`)}}}if(r.size>1){try{await F(`${e}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${e}${o}`)}try{await _(`${e}${o}${t}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${e}/workflows/NPM.yml`)}}else try{await N(`${e}${o}${t}`,h.F_OK);try{await O(`${e}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${e}`)}}catch{}}};var S=async()=>await v(k);export{S as default};
