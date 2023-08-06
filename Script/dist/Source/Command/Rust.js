import{constants as f}from"fs";import{access as g,mkdir as $,rm as w,writeFile as p}from"fs/promises";import{basename as u,dirname as y}from"path";import d from"../Library/Dirs.js";import h from"../Library/Types.js";import k from"../Library/Packages.js";import C from"../Option/Rust.js";const F=async n=>{for(const{Path:o,Name:a,Flow:l}of n)for(const[s,m]of await d(await k("cargo"))){const t=`${s}/.github`,r=await l();if(o==="/workflows/"&&a==="rust.yml")for(const e of m){const i=y(e).replace(s,""),c=(await h()).get(e.split("/").pop());typeof c<"u"&&c==="cargo"&&r.add(`
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
`)}if(r.size>1){try{await $(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await p(`${t}${o}${a}`,`${[...r].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/rust.yml`)}}else try{await g(`${t}${o}${a}`,f.F_OK);try{await w(`${t}${o}${a}`)}catch{console.log(`Could not remove ${o}${a} for: ${t}`)}}catch{}}};var R=async()=>{await F(C)};export{R as default};
