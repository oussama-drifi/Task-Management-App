import { useState } from 'react';
import SearchItem from './searchItem';
import './searchResults.css'

const SearchResults = () => {

    // const [isLoading, setIsLoading] = useState(false);

    const countries = [
        {
            img: "argentina.png",
            country: "argentina"
        },
        {
            img: "france.png",
            country: "france"
        },
        {
            img: "canada.png",
            country: "canada"
        },
        {
            img: "italy.png",
            country: "italy"
        },
        // {
        //     img: "thailand.png",
        //     country: "thailand"
        // },
        // {
        //     img: "usa.png",
        //     country: "united states"
        // },
        // {
        //     img: "germany.png",
        //     country: "germany"
        // },
        // {
        //     img: "spain.png",
        //     country: "spain"
        // },
        // {
        //     img: "morocco.png",
        //     country: "morocco"
        // },
        // {
        //     img: "ukrain.png",
        //     country: "ukrain"
        // }
    ];
    return (
        <div class="options">
            <div class="loader"><i className="bi bi-arrow-repeat"></i></div>
            <div className="results">
                {
                    countries.map(({img, country}) => <SearchItem imgName={img} name={country}/>)
                }
            </div>
        </div>
    )
}

export default SearchResults