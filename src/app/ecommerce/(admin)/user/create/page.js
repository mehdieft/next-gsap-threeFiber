import { createUser } from '@/app/ecommerce/actions/userActions';
import Label from '../../../../components/eccomerce/Label/Label';
import { FaUser, FaLock, FaUserTag } from 'react-icons/fa';
import Toast from '@/app/components/eccomerce/toast';

export default async function CreateUser({searchParams }){
    const error=(await searchParams).error
    
    return(
        <>
        
           <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl shadow-gray-200/50 p-8 md:p-12 transition-all duration-300 hover:shadow-gray-300/50">
                {error && (
                    <Toast message={error} type='error' />
                )}
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
                            <FaUser className="text-3xl text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Register User
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">Create a new user account</p>
                    </div>

                    <form action={createUser} className="space-y-8">
                        {/* Row 1: Username & User Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label required={true} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <FaUser className="text-blue-500 text-xs" />
                                    Username
                                </Label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        id="username" 
                                        name="username"
                                        className="w-full px-4 py-3.5 pl-11 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-300"
                                        placeholder="Enter username" 
                                        required 
                                    />
                                    <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <FaUserTag className="text-purple-500 text-xs" />
                                    User Type
                                </Label>
                                <div className="relative">
                                    <select name="userType" className="w-full px-4 py-3.5 pl-11 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none appearance-none cursor-pointer hover:border-gray-300">
                                        <option value="superAdmin">Super Admin</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                    <FaUserTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Password & Confirm Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label required={true} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <FaLock className="text-green-500 text-xs" />
                                    Password
                                </Label>
                                <div className="relative">
                                    <input 
                                        type="password" 
                                        className="w-full px-4 py-3.5 pl-11 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-300" 
                                        placeholder="Enter password" 
                                        name="password" 
                                        required
                                    />
                                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label required={true} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <FaLock className="text-orange-500 text-xs" />
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <input 
                                        type="password" 
                                        className="w-full px-4 py-3.5 pl-11 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-300" 
                                        placeholder="Confirm password" 
                                        name="confirmPassword" 
                                        required
                                    />
                                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                type="submit" 
                                className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.01] active:scale-95"
                            >
                                Create Account
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="text-center text-xs text-gray-400 mt-2">
                            Password must be at least 8 characters long
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}