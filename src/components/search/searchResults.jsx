import { useState } from 'react';
import SearchItem from './searchItem';
import './searchResults.css'

const SearchResults = () => {

    // const [isLoading, setIsLoading] = useState(false);

    const countries = ["spain", "france", "united states", "canada", "italy", "thailand"];
    return (
        <div class="options">
            <div class="loader"><i className="bi bi-arrow-repeat"></i></div>
            <ul id="menu" role="listbox">
                {
                    countries.map(country => (
                        <li key={country}>{country}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SearchResults