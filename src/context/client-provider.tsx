"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

export default function ClientSessionProvider({
  children,
  session
}: {
  children: ReactNode;
  session: Session | null;
}): ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
