import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { deleteUser } from "../../actions/userActions";
import Toast from "@/app/components/eccomerce/toast";

export default async function User({ searchParams }) {
    const params = await searchParams
    const page = parseInt(params.page) || 1;
    const pageSize = 15;
    const success=params.success

    const users = await prisma.adminUser.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.adminUser.count();
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="p-8">
            {success && <Toast type="success" message={success} />}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
                    <p className="text-gray-600 mt-2">Total Users: <span className="font-semibold text-blue-600">{total}</span></p>
                </div>
                <div> <Link className="px-4 py-2 rounded-md hover:bg-green-700 hover:text-white duration-300 bg-green-400" href="/ecommerce/user/create">create user</Link> </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full">
                    <thead className="bg-linear-to-r from-blue-600 to-blue-700 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Username</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">User Type</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Created At</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{user.userName}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.userType === 'admin'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                            }`}>
                                            {user.userType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(user.createdAt).toLocaleDateString()} {new Date(user.createdAt).toLocaleTimeString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <Link className="text-blue-600 hover:text-blue-900 font-semibold px-3" href={`/ecommerce/user/edit/${user.id}`} >ویرایش</Link>
                                        <form className="inline" action={deleteUser.bind(null,user.id)}>

                                        <button type="submit" className="text-red-400 hover:cursor-pointer hover:text-red-900 font-semibold">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
                </div>
                <div className="flex gap-2">
                    {page > 1 ? (
                        <Link
                            href={`?page=${page - 1}`}
                            className="px-4 py-2 rounded-lg font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Previous
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-400 cursor-not-allowed"
                        >
                            Previous
                        </button>
                    )}

                    {page < totalPages ? (
                        <Link
                            href={`?page=${page + 1}`}
                            className="px-4 py-2 rounded-lg font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Next
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-400 cursor-not-allowed"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}