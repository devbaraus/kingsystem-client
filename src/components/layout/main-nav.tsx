import Link from "next/link";

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link
        className="mr-6 flex items-center space-x-2 font-medium"
        href="/"
      >
        KingSystem
      </Link>
    </div>
  );
}
