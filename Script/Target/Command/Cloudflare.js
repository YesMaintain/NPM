import m from"../Library/Directory.js";import w from"../Library/Package.js";import $ from"../Library/Type.js";import p from"../Option/Cloudflare.js";import{constants as d}from"fs";import{access as u,mkdir as y,rm as C,writeFile as g}from"fs/promises";import{dirname as k}from"path";const F=async l=>{for(const{Path:o,Name:t,File:s}of l)for(const[a,f]of await m(await w("Cloudflare"))){const r=`${a}/.github`,e=await s();if(o==="/workflows/"&&t==="Cloudflare.yml")for(const i of f){const n=k(i).replace(a,""),c=(await $()).get(i.split("/").pop());typeof c<"u"&&c==="Cloudflare"&&e.add(`
            - uses: cloudflare/wrangler-action@v3
              with:
                  apiToken: \${{ secrets.CF_API_TOKEN }}
                  accountId: \${{ secrets.CF_ACCOUNT_ID }}
                  workingDirectory: .${n}
`)}if(e.size>1){try{await y(`${r}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${r}${o}`)}try{await g(`${r}${o}${t}`,`${[...e].join("")}`)}catch{console.log(`Could not create workflow for: ${r}/workflows/Cloudflare.yml`)}}else try{await u(`${r}${o}${t}`,d.F_OK);try{await C(`${r}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${r}`)}}catch{}}};var O=async()=>await F(p);export{O as default};
