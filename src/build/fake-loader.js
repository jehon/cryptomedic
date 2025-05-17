import { register } from "node:module";
import { pathToFileURL } from "node:url";

// ts-unused-exports:disable-next-line
export function load(url, context, nextLoad) {
  if (!url.endsWith(".css")) return nextLoad(url, context);

  return {
    format: "json",
    shortCircuit: true,
    source: JSON.stringify({})
  };
}

register("./src/build/fake-loader.js", pathToFileURL("./"));
