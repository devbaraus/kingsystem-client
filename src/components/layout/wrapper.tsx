import { ReactNode } from "react";
import AsideNav from "@/components/layout/aside-nav";

type Props = {
  children: ReactNode;
};
export default function Wrapper({ children }: Props) {
  return (
    <div className="flex-1">
      <div className="border-b">
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <AsideNav />
          <main className="relative py-6 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
