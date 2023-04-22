import{access as g,constants as k,mkdir as u,readFile as d,rm as h,writeFile as O}from"fs/promises";import{dirname as b}from"path";import v from"../lib/git-directories.js";import F from"../lib/package-types.js";import N from"../lib/packages.js";import _ from"../options/npm.js";const j=async m=>{for(const{path:o,name:r,workflow:w}of m)for(const[i,y]of await v(await N("npm"))){const t=`${i}/.github`,c=await w();if(o==="/workflows/"&&r==="npm.yml")for(const a of y){const s=b(a).replace(i,""),$=(await d(a,"utf-8")).toString(),p=(await F()).get(a.split("/").pop());if(typeof p<"u"&&p==="npm")try{const e=JSON.parse($);for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)){const l=e[n];if(n==="scripts")for(const f in l)Object.prototype.hasOwnProperty.call(l,f)&&f==="prepare"&&c.add(`
            - name: Publish .${s}
              continue-on-error: true
              working-directory: .${s}
              run: |
                  npm install --legacy-peer-deps
                  npm publish --legacy-peer-deps --provenance
              env:
                  NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
`)}}catch(e){console.log(a),console.log(e)}}if(c.size>1){try{await u(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await O(`${t}${o}${r}`,`${[...c].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/npm.yml`)}}else try{await g(`${t}${o}${r}`,k.F_OK);try{await h(`${t}${o}${r}`)}catch{console.log(`Could not remove ${o}${r} for: ${t}`)}}catch{}}};var J=async()=>{await j(_)};export{J as default};
