import{constants as g}from"fs";import{access as u,mkdir as d,readFile as k,rm as h,writeFile as N}from"fs/promises";import{dirname as O}from"path";import P from"../Library/Directory.js";import F from"../Library/Package.js";import b from"../Library/Type.js";import v from"../Option/NPM.js";const M=async m=>{for(const{Path:o,Name:e,File:w}of m)for(const[n,y]of await P(await F("NPM"))){const t=`${n}/.github`,i=await w();if(o==="/workflows/"&&e==="NPM.yml")for(const a of y){const s=O(a).replace(n,""),$=(await k(a,"utf-8")).toString(),l=(await b()).get(a.split("/").pop());if(typeof l<"u"&&l==="NPM")try{const r=JSON.parse($);for(const c in r)if(Object.prototype.hasOwnProperty.call(r,c)){const p=r[c];if(c==="scripts")for(const f in p)Object.prototype.hasOwnProperty.call(p,f)&&f==="prepublishOnly"&&i.add(`
            - name: Publish .${s}
              continue-on-error: true
              working-directory: .${s}
              run: |
                  npm install --legacy-peer-deps
                  npm publish --legacy-peer-deps --provenance
              env:
                  NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
`)}}catch(r){console.log(a),console.log(r)}}if(i.size>1){try{await d(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await N(`${t}${o}${e}`,`${[...i].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/NPM.yml`)}}else try{await u(`${t}${o}${e}`,g.F_OK);try{await h(`${t}${o}${e}`)}catch{console.log(`Could not remove ${o}${e} for: ${t}`)}}catch{}}};var S=async()=>await M(v);export{S as default};
