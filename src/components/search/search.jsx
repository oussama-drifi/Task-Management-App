import SearchBar from "./searchBar";
import SearchResults from './searchResults'

const Search = () => {
    const styles = {
        position: "relative"
    }
    return (
        <main style={styles}>
            <SearchBar />
            <SearchResults />
        </main>
    )
}

export default Search