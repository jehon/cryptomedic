import type { Config } from "jest";
import { defaults } from "jest-config";

// https://jestjs.io/docs/configuration
// https://kulshekhar.github.io/ts-jest/docs/getting-started/options

const config: Config = {
  verbose: true,
  rootDir: "src",
  showSeed: true,
  extensionsToTreatAsEsm: [...defaults.extensionsToTreatAsEsm, ".ts"],
  preset: "ts-jest/presets/default-esm"
  // testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, "legacy", "app"]
};

export default config;
