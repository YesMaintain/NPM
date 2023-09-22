import w from"../Library/Directory.js";import $ from"../Library/Package.js";import p from"../Library/Type.js";import d from"../Option/Cloudflare.js";import{constants as u}from"fs";import{access as y,mkdir as g,rm as C,writeFile as k}from"fs/promises";import{dirname as h}from"path";const F=async l=>{for(const{Path:o,Name:t,File:s}of l)for(const[c,n]of await w(await $("Cloudflare"))){const r=`${c}/.github`,e=await s();if(o==="/workflows/"&&t==="Cloudflare.yml")for(const a of n){const f=h(a).replace(c,""),i=(await p()).get(a.split("/").pop());if(typeof i<"u"&&i==="Cloudflare")try{e.add(`
            - uses: cloudflare/wrangler-action@v3
              with:
                  apiToken: \${{ secrets.CF_API_TOKEN }}
                  accountId: \${{ secrets.CF_ACCOUNT_ID }}
                  workingDirectory: .${f}
`)}catch(m){console.log(a),console.log(m)}}if(e.size>1){try{await g(`${r}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${r}${o}`)}try{await k(`${r}${o}${t}`,`${[...e].join("")}`)}catch{console.log(`Could not create workflow for: ${r}/workflows/Cloudflare.yml`)}}else try{await y(`${r}${o}${t}`,u.F_OK);try{await C(`${r}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${r}`)}}catch{}}};var P=async()=>await F(d);export{P as default};
