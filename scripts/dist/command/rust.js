import{access as m,constants as g,mkdir as w,rm as p,writeFile as $}from"fs/promises";import{basename as u,dirname as y}from"path";import d from"../lib/git-directories.js";import h from"../lib/package-types.js";import k from"../lib/packages.js";import b from"../options/rust.js";const v=async n=>{for(const{path:o,name:t,workflow:f}of n)for(const[i,l]of await d(await k("cargo"))){const r=`${i}/.github`,a=await f();if(o==="/workflows/"&&t==="rust.yml")for(const e of l){const c=y(e).replace(i,""),s=(await h()).get(e.split("/").pop());typeof s<"u"&&s==="cargo"&&a.add(`
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
                args: --release --all-features --manifest-path .${c}/${u(e)}
`)}if(a.size>1){try{await w(`${r}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${r}${o}`)}try{await $(`${r}${o}${t}`,`${[...a].join("")}`)}catch{console.log(`Could not create workflow for: ${r}/workflows/rust.yml`)}}else try{await m(`${r}${o}${t}`,g.F_OK);try{await p(`${r}${o}${t}`)}catch{console.log(`Could not remove ${o}${t} for: ${r}`)}}catch{}}};var z=async()=>{await v(b)};export{z as default};
