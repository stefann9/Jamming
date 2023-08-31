import { useState } from "react";
import "./SearchBar.css";
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="SearchBar">
      <input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Enter A Song, Album, or Artist"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(searchTerm);
            setSearchTerm("");
          }
        }}
      />
      <button
        className="SearchButton"
        onClick={() => {
          onSearch(searchTerm);
          setSearchTerm("");
        }}
      >
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
