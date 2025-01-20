export function load(url, context, nextLoad) {
  if (!url.endsWith(".css")) return nextLoad(url, context);

  return {
    format: "json",
    shortCircuit: true,
    source: JSON.stringify({})
  };
}
