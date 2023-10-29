import { useMutation, useQuery } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';
import { QUERY_ME} from '../../utils/queries'

export default function SearchList({ users }) {
    const [addFriend] = useMutation(ADD_FRIEND);
    const { data, loading, error } = useQuery(QUERY_ME);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const friendsList = data.me.friends;
    const friendId = friendsList.map((friend) => friend._id);
    console.log("friendslist", friendsList, "friendId", friendId);

    const handleAddFriend = async (userId) => {
        try {
            await addFriend({
                variables: {
                    userId: userId
                }
            });       
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    console.log(users)
    return (
        <ul role="list" className="divide-y divide-pink">
            {users.map((user) => (
                <li key={user._id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <img className="h-12 w-12 flex-none rounded-full bg-white" src={user.profilePic} alt="" />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-darkestpink">{user.username}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-darkestpink">{user.email}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <div className="mt-1 flex items-center gap-x-1.5">
                            {friendId.includes(user._id) ? (
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-grey-300 px-3 py-2 text-sm font-semibold text-darkestpink shadow-sm"
                                        disabled
                                    >
                                    Friends
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-lightestpink px-3 py-2 text-sm font-semibold text-darkestpink shadow-sm hover:bg-pink sm:ml-3 sm:w-auto"
                                        onClick={() => handleAddFriend(user._id)}
                                    >
                                    Add Friend
                                    </button>
                                )}
                            {/* <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-lightestpink px-3 py-2 text-sm font-semibold text-darkestpink shadow-sm hover:bg-pink sm:ml-3 sm:w-auto"
                                onClick={() => handleAddFriend(user._id)}
                            >
                            Add Friend
                            </button> */}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}