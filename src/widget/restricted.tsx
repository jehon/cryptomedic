import React, { useSyncExternalStore } from "react";

import { getSession, onSession } from "../../legacy/app-old/v2/js/session";

export function useRequiresTransaction(role?: string) {
  function getSnapshot(): boolean {
    if (!role) {
      return true;
    }

    if (!getSession()) {
      return false;
    }

    const authorized: string[] = (getSession() as any).authorized;
    if (!authorized) {
      return false;
    }

    return authorized.includes(role);
  }

  function subscribe(callback: () => void) {
    return onSession(callback);
  }

  return useSyncExternalStore(subscribe, getSnapshot);
}

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
