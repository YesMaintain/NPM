import{access as g,mkdir as k,readFile as u,rm as d,writeFile as h}from"fs/promises";import O from"../lib/git-directories.js";import b from"../lib/package-types.js";import v from"../lib/packages.js";import F from"../options/npm.js";import{dirname as N}from"path";import{constants as _}from"fs";const j=async m=>{for(const{path:o,name:r,workflow:w}of m)for(const[c,y]of await O(await v("npm"))){const t=`${c}/.github`,i=await w();if(o==="/workflows/"&&r==="npm.yml")for(const a of y){const s=N(a).replace(c,""),$=(await u(a,"utf-8")).toString(),p=(await b()).get(a.split("/").pop());if(typeof p<"u"&&p==="npm")try{const e=JSON.parse($);for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)){const l=e[n];if(n==="scripts")for(const f in l)Object.prototype.hasOwnProperty.call(l,f)&&f==="prepublishOnly"&&i.add(`
            - name: Publish .${s}
              continue-on-error: true
              working-directory: .${s}
              run: |
                  npm install --legacy-peer-deps
                  npm publish --legacy-peer-deps --provenance
              env:
                  NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
`)}}catch(e){console.log(a),console.log(e)}}if(i.size>1){try{await k(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await h(`${t}${o}${r}`,`${[...i].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/npm.yml`)}}else try{await g(`${t}${o}${r}`,_.F_OK);try{await d(`${t}${o}${r}`)}catch{console.log(`Could not remove ${o}${r} for: ${t}`)}}catch{}}};var S=async()=>{await j(F)};export{S as default};
