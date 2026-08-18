"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SVGIcon = ({ path, size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

const OverviewIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const icons = {
  orders:
    "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  products: "M12 2l9 4.9V17L12 22 3 17V6.9zM3 7l9 5 9-5M12 22V12",
  customers:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  shipping:
    "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3M16 3h5l2 5-2 5h-5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM10 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM20 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  discounts:
    "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  payments: "M1 4h22v16H1zM1 10h22",
  reviews:
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  analytics: "M18 20V10M12 20V4M6 20v-6",
  reports:
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  integrations:
    "M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5zM2 17c0-3 2.5-5 5-5h10c2.5 0 5 2 5 5v4H2v-4z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  chevronDown: "M6 9l6 6 6-6",
  dots: "M5 12h.01M12 12h.01M19 12h.01",
};

const NAV_SECTIONS = [
  {
    title: "Main",
    items: [
      { label: "Overview", href: "/ecommerce/admin", icon: <OverviewIcon /> },
      {
        label: "Orders",
        href: "/ecommerce/admin/orders",
        icon: <SVGIcon path={icons.orders} />,
        badge: 14,
        badgeVariant: "red",
      },
      {
        label: "Products",
        href: "/ecommerce/admin/product",
        icon: <SVGIcon path={icons.products} />,
      },
      {
        label: "Customers",
        href: "/ecommerce/admin/user",
        icon: <SVGIcon path={icons.customers} />,
      },
    ],
  },
  {
    title: "Store",
    items: [
      {
        label: "Shipping",
        href: "/ecommerce/admin/shipping",
        icon: <SVGIcon path={icons.shipping} />,
      },
      {
        label: "Discounts",
        href: "/ecommerce/admin/discounts",
        icon: <SVGIcon path={icons.discounts} />,
        dot: true,
      },
      {
        label: "Payments",
        href: "/ecommerce/admin/payments",
        icon: <SVGIcon path={icons.payments} />,
      },
     
    ],
  },
  {
    title: "Insights",
    items: [
      {
        label: "Analytics",
        href: "/ecommerce/admin/analytics",
        icon: <SVGIcon path={icons.analytics} />,
      },
      {
        label: "Reports",
        href: "/ecommerce/admin/reports",
        icon: <SVGIcon path={icons.reports} />,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Integrations",
        href: "/ecommerce/admin/integrations",
        icon: <SVGIcon path={icons.integrations} />,
      },
      {
        label: "Settings",
        href: "/ecommerce/admin/settings",
        icon: <SVGIcon path={icons.settings} />,
      },
    ],
  },
];

function NavLink({ item }) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] font-medium transition-all w-full ${
        isActive
          ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-blue-100 dark:ring-blue-900"
          : "text-zinc-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
      }`}
    >
      <span className="w-4 flex items-center justify-center shrink-0">
        {item.icon}
      </span>
      <span className="flex-1">{item.label}</span>

      {item.badge && (
        <span
          className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
            item.badgeVariant === "red"
              ? "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700"
          }`}
        >
          {item.badge}
        </span>
      )}

      {item.dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
          aria-label="new"
        />
      )}
    </Link>
  );
}

export default function AdminSidebar() {
  return (
    <aside className="w-55 min-w-55 hidden md:flex flex-col fixed left-0 top-23 h-[calc(100vh-92px)] bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shadow-sm z-30">
      {/* Top: brand + store picker */}
      <div className="px-3 pt-3.5 pb-2.5 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6.5 h-6.5 rounded-md bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/30">
            <SVGIcon path={icons.bolt} size={13} />
          </div>
          <span className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
            ShopOS
          </span>
          <span className="ml-auto text-[9px] font-medium bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 rounded px-1.5 py-0.5 uppercase tracking-wider">
            Admin
          </span>
        </div>

        {/* Store picker */}
        <button className="flex items-center gap-1.5 w-full px-2 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
          <div className="w-4.5 h-4.5 rounded bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-700 dark:text-green-300 text-[9px] font-medium shrink-0">
            M
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 flex-1 text-left">
            Main store
          </span>
          <SVGIcon path={icons.chevronDown} size={12} />
        </button>
      </div>

      {/* Nav sections */}
      <nav
        className="flex-1 overflow-y-auto px-2 py-2 space-y-4"
        aria-label="Sidebar navigation"
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-600 uppercase tracking-widest px-2 mb-1">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom: user row */}
      <div className="px-2 py-2 border-t border-zinc-200 dark:border-zinc-800">
        <button className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-white dark:hover:bg-zinc-800 transition-colors">
          <div className="w-6.5 h-6.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-medium flex items-center justify-center border border-blue-200 dark:border-blue-800 shrink-0">
            AK
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-[11px] font-medium text-zinc-900 dark:text-zinc-100 truncate">
              Ali Karim
            </p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
              Super admin
            </p>
          </div>
          <SVGIcon path={icons.dots} size={13} />
        </button>
      </div>
    </aside>
  );
}
