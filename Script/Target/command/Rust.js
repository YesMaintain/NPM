import{constants as m}from"fs";import{access as g,writeFile as w,mkdir as $,rm as p}from"fs/promises";import{basename as u,dirname as y}from"path";import d from"../Library/Directory.ts";import h from"../Library/Package.ts";import k from"../Library/Type.ts";import C from"../Option/Rust.js";const b=async n=>{for(const{Path:o,Name:a,Workflow:l}of n)for(const[s,f]of await d(await h("cargo"))){const t=`${s}/.github`,r=await l();if(o==="/workflows/"&&a==="Rust.yml")for(const e of f){const i=y(e).replace(s,""),c=(await k()).get(e.split("/").pop());typeof c<"u"&&c==="cargo"&&r.add(`
            - uses: actions/cache@v3.3.1
              with:
                  path: |
                      ~/.cargo/bin/
                      ~/.cargo/registry/index/
                      ~/.cargo/registry/cache/
                      ~/.cargo/git/db/
                      target/
                      Target/
                  key: \${{ runner.os }}-cargo-\${{ hashFiles('.${i}/Cargo.toml') }}
            - uses: actions-rs/cargo@v1.0.3
              with:
                command: build
                args: --release --all-features --manifest-path .${i}/${u(e)}
`)}if(r.size>1){try{await $(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await w(`${t}${o}${a}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/Rust.yml`)}}else try{await g(`${t}${o}${a}`,m.F_OK);try{await p(`${t}${o}${a}`)}catch{console.log(`Could not remove ${o}${a} for: ${t}`)}}catch{}}};var O=async()=>await b(C);export{O as default};
