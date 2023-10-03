import NavSection, { NavSectionProps } from "@/components/layout/aside-nav-section";

export default function AsideNav() {
  const links: NavSectionProps[] = [
    {
      name: "Getting Started",
      items: [
        {
          name: "Introduction",
          href: "/docs",
        },
      ],
    },
  ];

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-hidden md:sticky md:block">
      <div
        className="relative h-full overflow-hidden py-6 pl-8 pr-6 lg:py-8"
        dir="ltr"
        // style={{
        //   "--radix-scroll-area-corner-height": "0px",
        //   "--radix-scroll-area-corner-width": "0px",
        // }}
      >
        <div
          className="h-full w-full rounded-[inherit]"
          style={{
            overflow: "hidden scroll",
          }}
        >
          <div className="table min-w-full">
            {links.map((item) => (
              <div
                className="w-full"
                key={item.name}
              >
                <NavSection
                  items={item.items}
                  name={item.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
