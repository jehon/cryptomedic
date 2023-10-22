import React from "react";
import { useRequiresTransaction } from "../utils/security";

export default function Restricted({
  requiresTransaction,
  inverted,
  children
}: {
  requiresTransaction: string;
  inverted?: boolean;
  children: React.ReactNode;
}) {
  const isAllowed = useRequiresTransaction(requiresTransaction);

  // Logical XOR with potentially non boolean
  if (!isAllowed != !inverted) {
    return children;
  }
  return <></>;
}
