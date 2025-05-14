export function routeParent(url: string, steps: number = 1) {
  // TODO: handle parameters later...
  return "/" + url.substring(1).split("/").slice(0, -steps).join("/");
}
