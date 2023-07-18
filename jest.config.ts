import type { Config } from "jest";
import { defaults } from "jest-config";

//  https://jestjs.io/docs/configuration

const config: Config = {
  verbose: true,
  rootDir: "src",
  showSeed: true
  // testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, "legacy", "app"]
};

export default config;
