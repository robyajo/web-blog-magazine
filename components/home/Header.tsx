import Link from "next/link";
import menuLinks from "@/data/menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="flex flex-col max-w-380 w-full mx-auto px-4 md:pt-6 pt-4 lg:pb-4 md:pb-4 sm:pb-2 xs:pb-2">
      <div className="hidden md:flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <Link href="/search" aria-label="Search">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="7" stroke="black" strokeWidth="2" />
              <line
                x1="16.5"
                y1="16.5"
                x2="22"
                y2="22"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </Link>
          <Link href="#">U.S.</Link>
          <Link href="#">International</Link>
          <Link href="#">Canada</Link>
          <Link href="#">Español</Link>
          <Link href="#">中文</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/subscribe"
            className="px-3 py-1 border border-black rounded-full"
          >
            Subscribe
          </Link>
          <Link
            href="/login"
            className="px-3 py-1 border border-black rounded-full"
          >
            Log in
          </Link>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 items-center">
        <div className="hidden md:flex flex-col">
          <span className="text-xs">{today}</span>
          <Link href="#" className="text-xs underline">
            Today’s Paper
          </Link>
        </div>
        <div className="flex justify-center">
          <Link href="/" aria-label="Return to homepage">
            <span className="font-serif text-4xl md:text-5xl tracking-tight">
              Fyrre Magazine
            </span>
          </Link>
        </div>
        <div className="hidden md:flex justify-end">
          <div className="text-xs flex items-center gap-3">
            <span>Market</span>
            <span>+1.2%</span>
          </div>
        </div>
      </div>

      <div className="md:hidden flex items-center justify-between mt-3">
        <Link href="/" aria-label="Return to homepage">
          <span className="font-serif text-3xl tracking-tight">
            Fyrre Magazine
          </span>
        </Link>
        <Sheet>
          <SheetTrigger aria-labelledby="button-label">
            <span id="button-label" hidden>
              Menu
            </span>
            <svg
              aria-hidden="true"
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="25" height="4" fill="black" />
              <rect y="6" width="25" height="4" fill="black" />
              <rect y="12" width="25" height="4" fill="black" />
            </svg>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="w-full pt-14"
            aria-label="Menu Toggle"
          >
            <nav className="flex flex-col gap-6" aria-labelledby="mobile-nav">
              {menuLinks.map((menuItem, index) => (
                <Link key={index} href={menuItem.href}>
                  {menuItem.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <nav className="hidden md:flex sticky top-0 z-50 items-center justify-center gap-6 mt-4 text-sm bg-white border-t border-b border-black py-2">
        {menuLinks.map((menuItem, index) => (
          <Link key={index} href={menuItem.href} className="hover:underline">
            {menuItem.label}
          </Link>
        ))}
      </nav>

      {/* <hr className="border-black mt-4" /> */}
    </header>
  );
}
