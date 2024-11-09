


const SearchBar = ({ onSearch, placeholder }) => {

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => onSearch(e.target.value)}
            />
            <img src={search} alt="search" />
        </div>
    )
}