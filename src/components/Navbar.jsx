"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/items" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
      <div className="container-custom h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href={makeLink("/")}>
          <h1 className="text-xl md:text-2xl font-bold flex items-center">
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              Central
            </span>
            <span className="text-slate-900 font-semibold">
              {" "}Biomedicals
            </span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={makeLink(link.path)}
              className="relative py-1 hover:text-indigo-600 transition duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Link href={makeLink("/contact")}>
            <button className="primary-btn bg-gradient-to-r from-indigo-600 to-fuchsia-600 !text-white hover:from-indigo-700 hover:to-fuchsia-700 transition duration-300 shadow-md shadow-indigo-600/10">
              Get Quote
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen
          ? "max-h-[500px]"
          : "max-h-0"
          }`}
      >
        <div className="bg-white border-t border-slate-100 p-6">

          <nav className="flex flex-col gap-5 text-slate-700 font-medium">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={makeLink(link.path)}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
            >
              <button className="primary-btn mt-3 w-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 !text-white hover:from-indigo-700 hover:to-fuchsia-700 transition duration-300">
                Get Quote
              </button>
            </Link>

          </nav>
        </div>
      </div>
    </header>
  );
}