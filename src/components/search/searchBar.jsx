import { useEffect, useState } from 'react'
import './searchBar.css'

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // more logic coming here...
    }

    const labelStyles = {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0"
    }
    
    return (
        <div className="search-input">
            <button type='button'><i className="bi bi-search"></i></button>
            <label htmlFor="search-country" style={labelStyles}></label>
            <input 
                id='search-country'
                type="text" 
                placeholder="Search" 
                value={searchQuery} 
                onChange={handleChange} 
            />
            {/* conditionnaly render the clear button */}
            {
                searchQuery.length > 0 && (<button type='button' onClick={() => setSearchQuery("")}><i className="bi bi-x-lg"></i></button>)
            }
        </div>
    )
}

export default SearchBar