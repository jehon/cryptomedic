const objectList = new Map();

export function registrySet(name, classObject) {
  objectList.set(name, classObject);
}

export function registryGet(name) {
  if (!objectList.has(name)) {
    throw new Error(`Registry: ${name} is unknown`);
  }
  return objectList.get(name);
}
