import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

export default function Profile() {
    const { data, loading, error } = useQuery(QUERY_ME);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const user = data.me

    return (
        <form>
            <div className="flex min-h-screen flex-1 justify-center px-6 py-12 lg:px-8 space-y-12"> 
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-darkestpink">Profile</h2>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-darkestpink text-center">
                                Profile Picture
                            </label>                        
                            <div className="mt-2 flex items-center gap-x-3">
                                <img className="mx-auto h-10 w-auto rounded-full bg-white" src={user.profilePic} alt="" />
                            </div>
                        </div>

                        <div className="sm:col-span-4 mt-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-darkestpink text-center">
                                Username
                            </label>
                            <div className="mt-1">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-pink focus-within:ring-2 focus-within:ring-inset focus-within:darkpink sm:max-w-md justify-center">
                                <span className="flex select-none items-center pl-3 text-darkpink sm:text-sm">{user.username}</span>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-4 mt-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-darkestpink text-center">
                                Email
                            </label>
                            <div className="mt-1">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-pink focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md justify-center">
                                <span className="flex select-none items-center pl-3 text-darkpink sm:text-sm">{user.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full mt-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-darkestpink text-center">
                                Bio
                            </label>
                            <div className="mt-1">
                                <span className="block w-full rounded-md border-0 py-10 text-darkpink shadow-sm ring-1 ring-inset ring-pink placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    {user.bio}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}