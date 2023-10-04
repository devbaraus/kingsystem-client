import { AsideNavSection } from "@/components/layout/aside-nav-section";
import { ScrollArea } from "@/components/ui/scroll-area";
import { siteLinks } from "@/components/layout/header";

export default function AsideNav() {
  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
        <AsideNavSection items={siteLinks} />
      </ScrollArea>
    </aside>
  );
}
