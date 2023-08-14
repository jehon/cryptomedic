import type { Config } from "jest";
import { defaults } from "jest-config";

// https://jestjs.io/docs/configuration
// https://kulshekhar.github.io/ts-jest/docs/getting-started/options

const config: Config = {
  verbose: true,
  rootDir: "src",
  showSeed: true,
  extensionsToTreatAsEsm: [...defaults.extensionsToTreatAsEsm, ".ts"],
  // preset: "ts-jest/presets/default-esm"
  preset: "ts-jest/presets/js-with-ts"
  // transform: {
  //   "\\.[jt]sx?$": [
  //     "ts-jest",
  //     {
  //       useESM: true
  //     }
  //   ]
  // }
};

export default config;
