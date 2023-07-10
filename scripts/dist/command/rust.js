import{access as m,mkdir as g,rm as w,writeFile as p}from"fs/promises";import $ from"../lib/git-directories.js";import u from"../lib/package-types.js";import y from"../lib/packages.js";import{basename as d,dirname as h}from"path";import k from"../options/rust.js";import{constants as b}from"fs";const v=async n=>{for(const{path:o,name:t,workflow:f}of n)for(const[i,l]of await $(await y("cargo"))){const r=`${i}/.github`,a=await f();if(o==="/workflows/"&&t==="rust.yml")for(const e of l){const c=h(e).replace(i,""),s=(await u()).get(e.split("/").pop());typeof s<"u"&&s==="cargo"&&a.add(`
            - uses: actions/cache@v3.3.1
              with:
                  path: |
                      ~/.cargo/bin/
                      ~/.cargo/registry/index/
                      ~/.cargo/registry/cache/
                      ~/.cargo/git/db/
                      target/
                  key: \${{ runner.os }}-cargo-\${{ hashFiles('.${c}/Cargo.toml') }}
            - uses: actions-rs/cargo@v1.0.3
              with:
                command: build
                args: --release --all-features --manifest-path .${c}/${d(e)}
`)}if(a.size>1){try{await g(`${r}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${r}${o}`)}try{await p(`${r}${o}${t}`,`${[...a].join("")}`)}catch{console.log(`Could not create workflow for: ${r}/workflows/rust.yml`)}}else try{await m(`${r}${o}${t}`,b.F_OK);try{await w(`${r}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${r}`)}}catch{}}};var B=async()=>{await v(k)};export{B as default};
