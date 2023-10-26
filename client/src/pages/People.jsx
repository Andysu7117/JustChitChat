import People from '../components/People'
import SearchBar from '../components/SearchBar'
import { useState } from 'react'

export default function Search() {
  const [users, setUsers] = useState([]);

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 min-h-screen">
        <SearchBar onFormSubmit={setUsers} />
        <People users={users} />
    </div>
  );
}