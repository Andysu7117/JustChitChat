import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
 
export default function Friends({ onFriendClick }) {
  const { data, loading, error } = useQuery(QUERY_ME);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const friends = data.me.friends;
  return (
    <ul role="list" className="divide-y divide-pink">
      {friends.map((friend) => (
        <li key={friend._id} onClick={() => onFriendClick(friend._id)} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-pink" src={friend.profilePic} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-darkestpink">{friend.username}</p>
              <p className="mt-1 truncate text-xs leading-5 text-darkestpink">{friend.email}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-darkpink p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
