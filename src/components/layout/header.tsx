import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MainNav } from "@/components/layout/main-nav";
import UserDropdownMenu from "@/components/user/user-dropdown-menu";
import { SidebarNavItem } from "@/types/nav";

export const siteLinks: SidebarNavItem[] = [
  {
    title: "Sistemas",
    items: [
      {
        title: "Listar",
        href: "/system",
        items: [],
      },
      {
        title: "Criar",
        href: "/system/create",
        items: [],
      },
    ],
  },
];

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <MainNav />
        <MobileNav />
        <nav className="flex items-center">
          <UserDropdownMenu name={session?.user?.name} />
        </nav>
      </div>
    </header>
  );
}
