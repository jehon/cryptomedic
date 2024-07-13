let counter = 1;

export default function generateUUID(): string {
  return "uuid-" + counter++;
}
