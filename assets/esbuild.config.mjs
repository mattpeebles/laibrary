import { context } from "esbuild"

const ctx = await context({
  entryPoints: ["js/app.js"],
  bundle: true,
  target: "es2017",
  outdir: "../priv/static/assets",
  sourcemap: true,
  minify: false,
})

if (process.argv.includes("--watch")) {
  await ctx.watch()
  console.log("Watching for changes...")
} else {
  await ctx.rebuild()
  console.log("Build complete")
}
