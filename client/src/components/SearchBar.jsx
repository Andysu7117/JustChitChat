import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries'

export default function SearchBar({ onFormSubmit}) {
    const [searchTerm, setSearchTerm] = useState('');


    const { data, loading, error } = useQuery(QUERY_USER, {
        variables: { username: searchTerm },
        skip: !searchTerm
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    useEffect(() => {
        if (data && data.user) {
            onFormSubmit([data.user]);
        }
    }, [data, onFormSubmit]);


    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div class="mb-3">
            <form onSubmit={handleSearchSubmit}>
                <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                    type="search"
                    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-pink bg-lightestpink bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-darkestpink outline-pink focus:ring-pink transition duration-200 ease-in-out focus:z-[3] focus:border-pink focus:text-darkestpink focus:shadow-pink focus:outline-pink dark:border-darkestpink dark:text-darkestpink dark:placeholder:text-darkestpink dark:focus:border-pink"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    onChange={(e) => setSearchTerm(e.target.value)} />

                    <span
                    class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5">
                        <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd" />
                    </svg>
                    </span>
                </div>
            </form>
        </div>
    )
}