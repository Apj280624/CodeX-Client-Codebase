import React from "react";
import "../css/searchbar.css";

function SearchBar() {
  return (
    <div>
      <div className="search-box">
        <input className="search-input" placeholder="Enter here"></input>
        <button type="button" class="search-button">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
