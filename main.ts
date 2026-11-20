// news-image-20261119 entry.
// The program copies the front-page image (entry.png) to the output
// directory, so the grader receives exactly the image the repository holds.
// It writes the same bytes on every run: a plain file copy, no rendering.
// Running it twice produces byte-identical output, as the rules require.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const src = new URL("./entry.png", import.meta.url);
const dest = join(outDir, "entry.png");
copyFileSync(src, dest);
// Verify the copy is byte-identical to the source: the grader must receive
// exactly the image this repository holds, and a silent partial copy would
// fail the gate instead of the build.
const srcBytes = readFileSync(src);
const destBytes = readFileSync(dest);
if (!srcBytes.equals(destBytes)) {
  throw new Error("entry.png copy differs from source; refusing to hand in a corrupt output");
}
// The gate allows at most 1 MiB: refuse to hand in an oversized output
// instead of letting the entry fail server-side.
if (destBytes.length > 1048576) {
  throw new Error("entry.png exceeds the 1 MiB limit; refusing to hand in an oversized output");
}
