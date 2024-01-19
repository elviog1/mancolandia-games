"use client";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "../constants";
import Link from "next/link";

export default function BottomBar() {
  const pathName = usePathname();
  return (
    <div className="flex sticky md:hidden w-full px-4 py-2 justify-between bottom-0 z-20">
      {sidebarLinks.map((link) => {
        const isActive = pathName === link.route;
        return (
          <Link
            key={link.label}
            className={`flex gap-2 py-2 px-4 rounded-lg hover:bg-blue-800 duration-200 justify-start ${
              isActive && "bg-blue-800"
            } `}
            href={link.route}
          >
            {link.icon} <p className="max-sm:hidden">{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
}
