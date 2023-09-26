var Directory_default = async (Search) => {
  const Results = /* @__PURE__ */ new Map();
  Search.forEach(async (Search2) => {
    const Directory = await (await import("./WalkUntilGit.js")).default(Search2);
    Results.set(
      Directory,
      Results.has(Directory) ? Results.get(Directory).add(Search2) : new Set([Search2].sort())
    );
  });
  return Results;
};
export {
  Directory_default as default
};
