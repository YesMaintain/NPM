export default {
    format: "esm",
    minify: false,
    outdir: "Target",
    platform: "node",
    target: "esnext",
    write: true,
    plugins: [
        {
            name: "Target",
            setup({ onStart, initialOptions: { outdir } }) {
                onStart(async () => {
                    try {
                        await (await import("node:fs/promises")).rm(outdir, {
                            recursive: true,
                        });
                    }
                    catch (_Error) {
                        console.log(_Error);
                    }
                });
            },
        },
        (await import("esbuild-plugin-copy")).copy({
            resolveFrom: "out",
            assets: [
                {
                    from: "./Source/Workflow/*.yml",
                    to: "./Workflow/",
                },
            ],
        }),
    ],
};
