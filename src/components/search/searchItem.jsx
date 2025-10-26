const SearchItem = ({src, name}) => {
    return (
        <div className="search-item">
            <div className="country-image">
                <img src={src} alt="not found" />
            </div>
            <div className="countr-name">
                <span>{name}</span>
            </div>
        </div>
    )
}

export default SearchItem