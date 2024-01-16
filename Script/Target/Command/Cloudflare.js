var Cloudflare_default = async () => await (async (Files) => {
  for (const { Path, Name, File } of Files) {
    for (const [directory, packageFiles] of await (await import("../Function/Directory.js")).default(
      await (await import("../Function/Package.js")).default("Cloudflare")
    )) {
      const githubDir = `${directory}/.github`;
      const workflowBase = await File();
      if (Path === "/workflows/" && Name === "Cloudflare.yml") {
        for (const _package of packageFiles) {
          const packageDirectory = (await import("path")).dirname(_package).replace(directory, "");
          const environment = (await (await import("../Function/Type.js")).default()).get(_package.split("/").pop());
          if (typeof environment !== "undefined" && environment === "Cloudflare") {
            workflowBase.add(`
            - uses: cloudflare/wrangler-action@v3.4.1
              with:
                  apiToken: \${{ secrets.CF_API_TOKEN }}
                  accountId: \${{ secrets.CF_ACCOUNT_ID }}
                  workingDirectory: .${packageDirectory}
`);
          }
        }
      }
      if (workflowBase.size > 1) {
        try {
          await (await import("fs/promises")).mkdir(`${githubDir}${Path}`, {
            recursive: true
          });
        } catch {
          console.log(`Could not create: ${githubDir}${Path}`);
        }
        try {
          await (await import("fs/promises")).writeFile(
            `${githubDir}${Path}${Name}`,
            `${[...workflowBase].join("")}`
          );
        } catch {
          console.log(
            `Could not create workflow for: ${githubDir}/workflows/Cloudflare.yml`
          );
        }
      }
    }
  }
})((await import("../Variable/Cloudflare.js")).default);
export {
  Cloudflare_default as default
};
