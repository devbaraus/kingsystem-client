"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "@/types/nav";

import { cn } from "@/lib/utils";

export interface AsideNavSectionProps {
  items: SidebarNavItem[];
}

export function AsideNavSection({ items }: AsideNavSectionProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div
          className={cn("pb-4")}
          key={index}
        >
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{item.title}</h4>
          {item?.items?.length ? (
            <AsideNavSectionItems
              items={item.items}
              pathname={pathname}
            />
          ) : null}
        </div>
      ))}
    </div>
  ) : null;
}

interface AsideNavSectionItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function AsideNavSectionItems({ items, pathname }: AsideNavSectionItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href ? "font-medium text-foreground" : "text-muted-foreground",
            )}
            href={item.href}
            key={index}
            rel={item.external ? "noreferrer" : ""}
            target={item.external ? "_blank" : ""}
          >
            {item.title}
            {item.label ? (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            ) : null}
          </Link>
        ) : (
          <span
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
            key={index}
          >
            {item.title}
            {item.label ? (
              <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                {item.label}
              </span>
            ) : null}
          </span>
        ),
      )}
    </div>
  ) : null;
}
