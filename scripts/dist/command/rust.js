import{access as m,constants as w,mkdir as g,rm as p,writeFile as $}from"fs/promises";import{basename as u,dirname as y}from"path";import d from"../lib/git-directories.js";import h from"../lib/package-types.js";import k from"../lib/packages.js";import b from"../options/rust.js";const v=async n=>{for(const{path:o,name:r,workflow:f}of n)for(const[i,l]of await d(await k())){const t=`${i}/.github`,a=await f();if(o==="/workflows/"&&r==="rust.yml")for(const e of l){const s=y(e).replace(i,""),c=(await h()).get(e.split("/").pop());typeof c<"u"&&c==="cargo"&&a.add(`
            - uses: actions/cache@v3.3.1
              with:
                  path: |
                      ~/.cargo/bin/
                      ~/.cargo/registry/index/
                      ~/.cargo/registry/cache/
                      ~/.cargo/git/db/
                      target/
                  key: \${{ runner.os }}-cargo-\${{ hashFiles('.${s}/Cargo.toml') }}
            - uses: actions-rs/cargo@v1.0.3
              with:
                command: build
                args: --release --all-features --manifest-path .${s}/${u(e)}
`)}if(a.size>1){try{await g(`${t}${o}`,{recursive:!0})}catch{console.log(`Could not create: ${t}${o}`)}try{await $(`${t}${o}${r}`,`${[...a].join("")}`)}catch{console.log(`Could not create workflow for: ${t}/workflows/rust.yml`)}}else try{await m(`${t}${o}${r}`,w.F_OK);try{await p(`${t}${o}${r}`)}catch{console.log(`Could not remove ${o}${r} for: ${t}`)}}catch{}}};var z=async()=>{await v(b)};export{z as default};
