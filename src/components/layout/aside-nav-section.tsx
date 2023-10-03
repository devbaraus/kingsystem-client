import Link from "next/link";

type NavSectionChildren = {
  name: string;
  href: string;
};

export type NavSectionProps = {
  name: string;
  items: NavSectionChildren[];
};

export default function NavSection({ name, items }: NavSectionProps) {
  return (
    <div className="pb-4">
      <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{name}</h4>
      <div className="grid grid-flow-row auto-rows-max text-sm">
        {items.map((item) => (
          <Link
            className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
            href={item.href}
            key={item.href}
            target=""
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
