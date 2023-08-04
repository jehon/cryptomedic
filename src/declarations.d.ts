// https://stackoverflow.com/a/68011107/1954789
declare module "*.css?inline" {
  const content: { [className: string]: string };
  export = content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export = content;
}
