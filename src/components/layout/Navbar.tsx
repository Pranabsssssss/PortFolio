"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { useLoading } from "@/components/ui/LoadingContext";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Achievements", href: "/achievements" },
  { name: "Blog", href: "https://blog.pranab.tech", external: true },
  { name: "Support", href: "/support" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { isAppLoading } = useLoading();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Determine if we've scrolled past the top 50px
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Determine scroll direction to hide/show navbar
    if (latest > 150 && latest > previous) {
      setHidden(true); // scrolling down
      setIsOpen(false); // also close mobile menu if scrolling down
    } else {
      setHidden(false); // scrolling up
    }
  });

  useEffect(() => {
    // We are now handling scroll via Framer Motion's useMotionValueEvent above
  }, []);

  return (
    <>
      {/* Logo on extreme left absolute - Hidden on mobile */}
      <motion.div 
        initial="hidden"
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        animate={hidden || isAppLoading ? "hidden" : "visible"}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isAppLoading ? 0 : 0.2 }}
        className="hidden md:flex fixed left-10 top-6 z-[60] items-center"
      >
        <Link href="/" aria-label="Home">
          <img src="/icon.svg" alt="Icon" className="w-8 h-8 hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
        </Link>
      </motion.div>

      <motion.nav
        initial="hidden"
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        animate={hidden || isAppLoading ? "hidden" : "visible"}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: isAppLoading ? 0 : 0.2 }}
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-colors duration-300 rounded-full border",
          scrolled
            ? "bg-[#09090b]/80 backdrop-blur-xl border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] py-2.5 px-6"
            : "bg-transparent border-transparent py-3 px-6"
        )}
      >
        <div className="flex items-center justify-center">
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : ""}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-colors hover:text-purple-400 relative px-4 py-2 rounded-lg hover:bg-zinc-800/50",
                  pathname === link.href ? "text-purple-400" : "text-zinc-300"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed top-20 left-1/2 -translate-x-1/2 w-[90%] bg-black/90 backdrop-blur-xl border border-zinc-800 rounded-2xl z-40 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.15)]"
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : ""}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-xl text-base font-semibold tracking-wide transition-colors text-center",
                  pathname === link.href
                    ? "bg-purple-600/10 text-purple-400 border border-purple-500/20"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
