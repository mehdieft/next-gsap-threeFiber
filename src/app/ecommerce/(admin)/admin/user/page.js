import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import Toast from "@/app/components/eccomerce/toast";
import SearchComponent from "./seacrh";
import UserTable from "./UserTable";


export default async function User({ searchParams }) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page, 10) || 1);
    const pageSize = 10;
    const success = params.success;
    const error = params.error;
    const search = typeof params.search === "string" ? params.search.trim() : "";
    const userType = typeof params.userType === "string" ? params.userType : "all";
    const sort = params.sort === "oldest" ? "oldest" : "newest";
    const where = {
        ...(search ? { userName: { contains: search } } : {}),
        ...(userType !== "all" ? { userType } : {}),
    };

    const [users, total] = await Promise.all([
        prisma.adminUser.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: sort === "oldest" ? "asc" : "desc" },
            where,
        }),
        prisma.adminUser.count({ where }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const pageUrl = (nextPage) => {
        const query = new URLSearchParams();
        if (search) query.set("search", search);
        if (userType !== "all") query.set("userType", userType);
        if (sort !== "newest") query.set("sort", sort);
        query.set("page", String(nextPage));
        return `?${query.toString()}`;
    };

    return (
        <div className="min-h-[calc(100vh-92px)] bg-[#f5f6f8] p-4 sm:p-7">
            {success && <Toast type="success" message={success} />}
            {error && <Toast type="error" message={error} />}
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-zinc-900">Users</h1>
                    <p className="mt-1 text-xs text-zinc-500">Manage your {total} registered users</p>
                </div>
                <Link className="inline-flex h-9 items-center rounded-md bg-zinc-900 px-4 text-xs font-medium text-white transition hover:bg-zinc-700" href="/ecommerce/admin/user/create">
                    Create user
                </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-zinc-100 p-4 sm:flex-row sm:items-center">
                    <SearchComponent />
                    <form className="flex gap-2" method="get">
                        <input type="hidden" name="search" value={search} />
                        <select name="userType" defaultValue={userType} className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-xs text-zinc-600 outline-none focus:border-blue-400">
                            <option value="all">All user types</option>
                            <option value="admin">Admin</option>
                            <option value="superAdmin">Super admin</option>
                            <option value="user">User</option>
                        </select>
                        <select name="sort" defaultValue={sort} className="h-9 rounded-md border border-zinc-200 bg-white px-3 text-xs text-zinc-600 outline-none focus:border-blue-400">
                            <option value="newest">Newest first</option>
                            <option value="oldest">Oldest first</option>
                        </select>
                        <button type="submit" className="h-9 rounded-md border border-zinc-200 px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-50">Apply</button>
                    </form>
                </div>
                <UserTable users={users} page={page} pageSize={pageSize} />
            </div>

            <div className="mt-4 flex items-center justify-between px-1 text-xs text-zinc-500">
                <div>
                    Page <span className="font-medium text-zinc-800">{page}</span> of <span className="font-medium text-zinc-800">{totalPages}</span>
                </div>
                <div className="flex gap-2">
                    {page > 1 ? (
                        <Link href={pageUrl(page - 1)} className="rounded-md border border-zinc-200 bg-white px-3 py-2 font-medium text-zinc-600 hover:bg-zinc-50">
                            Previous
                        </Link>
                    ) : (
                        <button disabled className="cursor-not-allowed rounded-md border border-zinc-100 bg-zinc-50 px-3 py-2 text-zinc-300">
                            Previous
                        </button>
                    )}

                    {page < totalPages ? (
                        <Link href={pageUrl(page + 1)} className="rounded-md border border-zinc-200 bg-white px-3 py-2 font-medium text-zinc-600 hover:bg-zinc-50">
                            Next
                        </Link>
                    ) : (
                        <button disabled className="cursor-not-allowed rounded-md border border-zinc-100 bg-zinc-50 px-3 py-2 text-zinc-300">
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}