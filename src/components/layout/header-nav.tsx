"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function HeaderNav() {
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Sistemas",
      href: "/system",
    },
  ];

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {links.map((item) => (
        <Link
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === item.href ? "text-foreground" : "text-foreground/60",
          )}
          href={item.href}
          key={item.href}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
