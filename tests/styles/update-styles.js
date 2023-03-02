import fs from "fs";
import path from "path";

import { inStyles, referenceUpdateFolder, p_ko, stylesJSON } from "./lib.js";

const problemsList = JSON.parse(fs.readFileSync(stylesJSON, "utf-8"));

for (const fset of problemsList) {
  if (!fset.problem && !fset.warning) {
    continue;
  }
  if (!fset.run) {
    console.error(`${p_ko}: ${fset.key} does not have a run`);
    continue;
  }
  process.stdout.write(`[update] ${fset.key}\n`);
  fs.copyFileSync(
    inStyles(fset.run),
    path.join(referenceUpdateFolder, fset.key)
  );
}
