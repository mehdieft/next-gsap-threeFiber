"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Overview", href: "/ecommerce/admin", icon: "grid" },
  { label: "Orders", href: "/ecommerce/admin/orders", icon: "shopping-bag", dot: true },
  { label: "Products", href: "/ecommerce/admin/products", icon: "package" },
  { label: "Customers", href: "/ecommerce/admin/customers", icon: "users" },
  { label: "Analytics", href: "/ecommerce/admin/analytics", icon: "bar-chart-2" },
  { label: "Discounts", href: "/ecommerce/admin/discounts", icon: "tag" },
];

const icons = {
  grid: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
  "shopping-bag": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  package: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l9 4.9V17L12 22 3 17V6.9z"/><polyline points="3 7 12 12 21 7"/><line x1="12" y1="22" x2="12" y2="12"/>
    </svg>
  ),
  users: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  "bar-chart-2": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  tag: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  search: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  bell: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  home: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  bolt: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  menu: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

export default function AdminNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Build breadcrumb segments from pathname
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="fixed top-0 inset-x-0 z-40 max-w-full shadow-sm">
      {/* Main navbar */}
      <nav className="flex items-center gap-2 sm:gap-4 px-3 sm:px-6 h-14 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        {/* Mobile menu toggle */}
        <button 
          className="lg:hidden w-8 h-8 rounded-md flex items-center justify-center text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? icons.close : icons.menu}
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2 min-w-[120px] sm:min-w-[180px] flex-shrink-0">
          <div className="w-7 h-7 rounded-[7px] bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-blue-500/30">
            {icons.bolt}
          </div>
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight hidden sm:inline">
            ShopOS
          </span>
          <span className="text-[10px] font-medium bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 rounded px-1.5 py-0.5 uppercase tracking-wider hidden sm:inline">
            Admin
          </span>
        </div>

        {/* Divider - hide on mobile */}
        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1 hidden sm:block" />

        {/* Nav links - desktop */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 overflow-x-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-blue-100 dark:ring-blue-900"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {icons[link.icon]}
                {link.label}
                {link.dot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 ml-0.5 flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1 sm:gap-1.5 ml-auto flex-shrink-0">
          {/* Search - hide text on small screens */}
          <button className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 text-xs hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors whitespace-nowrap">
            {icons.search}
            <span className="hidden sm:inline">Search...</span>
            <span className="hidden sm:flex items-center gap-0.5 ml-0 sm:ml-1.5">
              <kbd className="text-[10px] bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded px-1 py-px font-mono text-zinc-400">⌘</kbd>
              <kbd className="text-[10px] bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded px-1 py-px font-mono text-zinc-400">K</kbd>
            </span>
          </button>

          {/* Notifications */}
          <button className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" aria-label="Notifications">
            {icons.bell}
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500 border-2 border-white dark:border-zinc-900" />
          </button>

          {/* Settings */}
          <button className="hidden sm:flex w-8 h-8 rounded-md items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" aria-label="Settings">
            {icons.settings}
          </button>

          {/* Divider - hide on mobile */}
          <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-0 sm:mx-1 hidden sm:block" />

          {/* Avatar */}
          <button className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] sm:text-[11px] font-medium flex items-center justify-center border border-blue-200 dark:border-blue-800 hover:opacity-80 hover:shadow-md transition-all flex-shrink-0" aria-label="User menu">
            AK
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-14  left-0 right-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-lg z-50 py-2 px-3">
          <div className="flex flex-col gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className="w-5 h-5 flex items-center justify-center">{icons[link.icon]}</span>
                  {link.label}
                  {link.dot && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 ml-auto flex-shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 px-3 sm:px-6 h-9 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto">
        <span className="text-zinc-400 dark:text-zinc-600 flex-shrink-0">{icons.home}</span>
        {segments.map((seg, i) => {
          const isLast = i === segments.length - 1;
          const label = seg.charAt(0).toUpperCase() + seg.slice(1);
          return (
            <span key={i} className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-zinc-300 dark:text-zinc-700 text-xs">›</span>
              <span className={`text-xs whitespace-nowrap ${isLast ? "text-zinc-900 dark:text-zinc-100 font-medium" : "text-zinc-400 dark:text-zinc-500"}`}>
                {label}
              </span>
            </span>
          );
        })}
      </div>
    </header>
  );
}