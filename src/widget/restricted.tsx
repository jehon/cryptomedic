import { useRequiresTransaction } from "../utils/security";

export default function Restricted(props: {
  requires?: string;
  // inverted?: boolean;
  children: React.ReactNode;
}) {
  const isAllowed = !props.requires || useRequiresTransaction(props.requires);

  // Logical XOR with potentially non boolean
  // if (!isAllowed !== !inverted) {
  if (isAllowed) {
    return props.children;
  }
  return <></>;
}
