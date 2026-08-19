"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchComponent() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");
  const userType = searchParams.get("userType");
  const sort = searchParams.get("sort");

  return (
    <form method="get" className="flex w-full gap-2 sm:max-w-md">
      <div className="relative min-w-0 flex-1">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">⌕</span>
        <input
          name="search"
          value={value}
          placeholder="Search usernames..."
          onChange={(event) => setValue(event.target.value)}
          className="h-9 w-full rounded-md border border-zinc-200 bg-white pl-8 pr-3 text-xs text-zinc-700 outline-none placeholder:text-zinc-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
        />
      </div>
      {userType && <input type="hidden" name="userType" value={userType} />}
      {sort && <input type="hidden" name="sort" value={sort} />}
      <input type="hidden" name="page" value="1" />
      <button
        type="submit"
        className="h-9 rounded-md border border-zinc-200 px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
      >
        Search
      </button>
    </form>
  );
}