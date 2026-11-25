// SPDX-License-Identifier: MIT
// One Star, Written in Sap — entry program (make.fun, program/v1, node22).
// Writes a single one-line 1-star review, in the voice of a houseplant
// reviewing its human owner, to /output/entry.txt (or $OUTPUT_DIR).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star. My owner waters me like he's apologizing to a stranger, then acts shocked when I start auditioning for compost. Would not photosynthesize here again.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 279 characters,
// not only white space, and a single line — no trailing newline either,
// so the file holds exactly the review line and nothing else.
// The review itself: a grievance (apology-style watering, shock at the
// plant dying) plus the reason for the single star, in a plant's voice
// (water, compost, photosynthesis) — funny, not just cute.
function selfCheck(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 279) {
    throw new Error(`entry is ${chars} characters, must be 1-279`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

selfCheck(ENTRY);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${[...ENTRY].length} chars to ${join(outDir, "entry.txt")}`);
