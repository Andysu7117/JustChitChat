import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

export default function Profile() {
    const { data, loading, error } = useQuery(QUERY_ME);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const user = data.me

    return (
        <div className="space-y-12"> 
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Profile Picture
                        </label>                        
                        <div className="mt-2 flex items-center gap-x-3">
                            <img className="h-12 w-12 flex-none rounded-full bg-white" src={user.profilePic} alt="" />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{user.username}</span>
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{user.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Bio
                        </label>
                        <div className="mt-2">
                            <p className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {user.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}