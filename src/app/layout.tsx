import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientSessionProvider from "@/context/client-provider";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s • KingSystem",
    default: "KingSystem"
  },
  description: "KingSystem is a simple platform for creating and sharing systems."
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider session={session}>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
