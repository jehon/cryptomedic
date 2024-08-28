import { useRequiresTransaction } from "../utils/security";

export default function Restricted({
  requires: requires,
  // inverted,
  children
}: {
  requires?: string;
  // inverted?: boolean;
  children: React.ReactNode;
}) {
  const isAllowed = !requires || useRequiresTransaction(requires);

  // Logical XOR with potentially non boolean
  // if (!isAllowed !== !inverted) {
  if (isAllowed) {
    return children;
  }
  return <></>;
}
