import { useEffect, useState } from 'react'
import './searchBar.css'

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [isQuerySet, setIsQuerySet] = useState(false);

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    }

    useEffect(() => {
        if (searchQuery !== "") {
            setIsQuerySet(prev => true);
        }
    }, [searchQuery]);


    const handleClear = () => {
        setSearchQuery("");
    }

    return (
        <div className="search-input">
            <button><i className="bi bi-search"></i></button>
            <input onChange={handleChange} value={searchQuery} type="text" placeholder="Search for country..." />
            <button className={isQuerySet ? "shown" : "hidden"} onClick={handleClear}><i className="bi bi-x-lg"></i></button>
        </div>
    )
}

export default SearchBar