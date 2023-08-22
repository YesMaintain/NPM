import{constants as w}from"fs";import{access as $,mkdir as p,rm as d,writeFile as u}from"fs/promises";import{dirname as g}from"path";import y from"../Library/Directory.js";import C from"../Library/Package.js";import k from"../Library/Type.js";import h from"../Option/Cloudflare.js";const F=async l=>{for(const{Path:o,Name:t,File:s}of l)for(const[i,n]of await y(await C("Cloudflare"))){const r=`${i}/.github`,e=await s();if(o==="/workflows/"&&t==="Cloudflare.yml")for(const a of n){const f=g(a).replace(i,""),c=(await k()).get(a.split("/").pop());if(typeof c<"u"&&c==="Cloudflare")try{e.add(`
            - uses: cloudflare/wrangler-action@v3
              with:
                  apiToken: \${{ secrets.CF_API_TOKEN }}
                  accountId: \${{ secrets.CF_ACCOUNT_ID }}
                  workingDirectory: .${f}
`)}catch(m){console.log(a),console.log(m)}}if(e.size>1){try{await p(`${r}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${r}${o}`)}try{await u(`${r}${o}${t}`,`${[...e].join("")}`)}catch{console.log(`Could not create workflow for: ${r}/workflows/Cloudflare.yml`)}}else try{await $(`${r}${o}${t}`,w.F_OK);try{await d(`${r}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${r}`)}}catch{}}};var P=async()=>await F(h);export{P as default};
