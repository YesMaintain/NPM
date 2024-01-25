var NPM_default = /* @__PURE__ */ new Set([
  {
    Path: "/workflows/",
    Name: "NPM.yml",
    File: async () => /* @__PURE__ */ new Set([
      (await (await import("node:fs/promises")).readFile(
        (await import("node:path")).resolve(
          `${(await import("node:path")).dirname(
            (await import("node:url")).fileURLToPath(import.meta.url)
          )}/../../Target/Workflow/NPM.yml`
        ),
        "utf-8"
      )).toString()
    ])
  }
]);
export {
  NPM_default as default
};
