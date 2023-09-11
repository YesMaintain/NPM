import{constants as f}from"fs";import{access as g,writeFile as $,mkdir as p,rm as w}from"fs/promises";import{basename as u,dirname as d}from"path";import y from"../Library/Directory.js";import h from"../Library/Package.js";import k from"../Library/Type.js";import F from"../Option/Rust.js";const C=async n=>{for(const{Path:o,Name:a,File:l}of n)for(const[s,m]of await y(await h("Cargo"))){const t=`${s}/.github`,r=await l();if(o==="/workflows/"&&a==="Rust.yml")for(const e of m){const i=d(e).replace(s,""),c=(await k()).get(e.split("/").pop());typeof c<"u"&&c==="Cargo"&&r.add(`
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
`)}if(r.size>1){try{await p(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await $(`${t}${o}${a}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/Rust.yml`)}}else try{await g(`${t}${o}${a}`,f.F_OK);try{await w(`${t}${o}${a}`)}catch{console.log(`Could not remove ${o}${a} for: ${t}`)}}catch{}}};var O=async()=>await C(F);export{O as default};
