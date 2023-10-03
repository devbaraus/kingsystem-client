import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientSessionProvider from "@/context/client-provider";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Wrapper from "@/components/layout/wrapper";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s • KingSystem",
    default: "KingSystem",
  },
  description: "KingSystem is a simple platform for creating and sharing systems.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientSessionProvider session={session}>
          <Header />
          <Wrapper>{children}</Wrapper>
          <Toaster />
          <Footer />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
