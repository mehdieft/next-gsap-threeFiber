"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteUser } from "../../../actions/userActions";

function initials(userName) {
  return userName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function UserTable({ users, page, pageSize }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const visibleIds = users.map((user) => user.id);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  function toggleAll() {
    setSelectedIds(allVisibleSelected ? [] : visibleIds);
  }

  function toggleUser(id) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id]
    );
  }

  return (
    <div className="overflow-x-auto">
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between border-b border-blue-100 bg-blue-50 px-5 py-2.5 text-xs text-blue-800">
          <span>{selectedIds.length} user{selectedIds.length === 1 ? "" : "s"} selected</span>
          <button type="button" className="font-semibold hover:text-blue-950" onClick={() => setSelectedIds([])}>
            Clear selection
          </button>
        </div>
      )}

      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-zinc-100 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
            <th className="w-12 px-5 py-3">
              <input
                type="checkbox"
                aria-label="Select all visible users"
                checked={allVisibleSelected}
                onChange={toggleAll}
                className="h-3.5 w-3.5 accent-blue-600"
              />
            </th>
            <th className="px-3 py-3">User</th>
            <th className="px-3 py-3">User type</th>
            <th className="px-3 py-3">Created date</th>
            <th className="w-16 px-5 py-3" aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map((user, index) => {
            const isSelected = selectedIds.includes(user.id);
            return (
              <tr key={user.id} className={`group border-b border-zinc-100 text-xs transition-colors last:border-0 hover:bg-zinc-50 ${isSelected ? "bg-blue-50/60" : ""}`}>
                <td className="px-5 py-3.5">
                  <input
                    type="checkbox"
                    aria-label={`Select ${user.userName}`}
                    checked={isSelected}
                    onChange={() => toggleUser(user.id)}
                    className="h-3.5 w-3.5 accent-blue-600"
                  />
                </td>
                <td className="px-3 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-700">
                      {initials(user.userName)}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-800">{user.userName}</p>
                      <p className="mt-0.5 text-[10px] text-zinc-400">User #{(page - 1) * pageSize + index + 1}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3.5">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium ${user.userType === "admin" || user.userType === "superAdmin" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}>
                    {user.userType}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-zinc-500">
                  {new Date(user.createdAt).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })}
                </td>
                <td className="relative px-5 py-3.5 text-right">
                  <button
                    type="button"
                    aria-label={`Actions for ${user.userName}`}
                    aria-expanded={openMenuId === user.id}
                    onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                    className="rounded-md px-2 py-1 text-lg leading-none text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                  >
                    &hellip;
                  </button>
                  {openMenuId === user.id && (
                    <div className="absolute right-5 top-11 z-10 w-28 overflow-hidden rounded-md border border-zinc-200 bg-white py-1 text-left shadow-lg">
                      <Link href={`/ecommerce/user/edit/${user.id}`} className="block px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50" onClick={() => setOpenMenuId(null)}>
                        Edit
                      </Link>
                      <form action={deleteUser.bind(null, user.id)}>
                        <button type="submit" className="block w-full px-3 py-2 text-left text-xs text-rose-600 hover:bg-rose-50">
                          Delete
                        </button>
                      </form>
                    </div>
                  )}
                </td>
              </tr>
            );
          }) : (
            <tr>
              <td colSpan="5" className="px-5 py-12 text-center text-sm text-zinc-400">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
