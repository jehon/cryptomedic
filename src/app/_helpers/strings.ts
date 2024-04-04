export function technical2Human(technical: string): string {
  return technical
    .split("_")
    .map((component) => component[0].toUpperCase() + component.slice(1))
    .join(" ");
}
