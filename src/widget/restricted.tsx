import { useRequiresTransaction } from "../utils/security";

export default function Restricted(props: {
  to?: string;
  // inverted?: boolean;
  children: React.ReactNode;
}) {
  const isAllowed = !props.to || useRequiresTransaction(props.to);

  // Logical XOR with potentially non boolean
  // if (!isAllowed !== !inverted) {
  if (isAllowed) {
    return props.children;
  }
  return <></>;
}
