import { useSyncExternalStore } from "react";

import { getSession, onSession } from "./session";

export function useRequiresTransaction(transaction?: string) {
  function getSnapshot(): boolean {
    if (!transaction) {
      return true;
    }

    if (!getSession()) {
      return false;
    }

    const authorized: string[] = (getSession() as any).authorized;
    if (!authorized) {
      return false;
    }

    return authorized.includes(transaction);
  }

  function subscribe(callback: () => void) {
    return onSession(callback);
  }

  return useSyncExternalStore(subscribe, getSnapshot);
}
