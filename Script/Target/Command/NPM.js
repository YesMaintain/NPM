import{constants as g}from"fs";import{access as u,mkdir as d,rm as k,readFile as h,writeFile as N}from"fs/promises";import{dirname as O}from"path";import P from"../Library/Directory.js";import F from"../Library/Package.js";import _ from"../Library/Type.js";import b from"../Option/NPM.js";const v=async m=>{for(const{Path:o,Name:t,File:w}of m)for(const[c,y]of await P(await F("NPM"))){const e=`${c}/.github`,i=await w();if(o==="/workflows/"&&t==="NPM.yml")for(const a of y){const n=O(a).replace(c,""),$=(await h(a,"utf-8")).toString(),l=(await _()).get(a.split("/").pop());if(typeof l<"u"&&l==="NPM")try{const r=JSON.parse($);for(const s in r)if(Object.prototype.hasOwnProperty.call(r,s)){const p=r[s];if(s==="scripts")for(const f in p)Object.prototype.hasOwnProperty.call(p,f)&&f==="prepublishOnly"&&i.add(`
            - name: Publish .${n}
              continue-on-error: true
              working-directory: .${n}
              run: |
                  npm install --legacy-peer-deps
                  npm publish --legacy-peer-deps --provenance
              env:
                  NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
`)}}catch(r){console.log(a),console.log(r)}}if(i.size>1){try{await d(`${e}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${e}${o}`)}try{await N(`${e}${o}${t}`,`${[...i].join("")}`)}catch{console.log(`Could not create workflow for: ${e}/workflows/NPM.yml`)}}else try{await u(`${e}${o}${t}`,g.F_OK);try{await k(`${e}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${e}`)}}catch{}}};var S=async()=>await v(b);export{S as default};
