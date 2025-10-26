import './searchItem.css'

const SearchItem = ({imgName, name}) => {
    return (
        <div className="search-item">
            <div className="country-image">
                <img src={new URL(`./images/${imgName}`, import.meta.url).href} alt="not found" width="30px"/>
            </div>
            <div className="country-name">
                <span>{name}</span>
            </div>
        </div>
    )
}

export default SearchItem