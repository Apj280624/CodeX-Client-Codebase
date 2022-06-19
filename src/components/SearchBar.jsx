import React, { useState } from "react";
import "../css/searchbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSocks,
  faXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function SearchBar(props) {
  const [keyword, setKeyword] = useState("");

  function handleChange(evt) {
    setKeyword(evt.target.value);
    // console.log(keyword);
  }

  function handleClearClick() {
    setKeyword("");
  }

  function handleSearchClick() {
    props.onClick(keyword);
  }

  return (
    <div>
      <div className="search-box">
        <input
          onChange={handleChange}
          className="search-input"
          placeholder="Enter here"
          value={keyword}
          maxLength="60"
        ></input>
        <button
          onClick={handleClearClick}
          type="button"
          className="cross-button"
        >
          <div className="cross-icon">
            <p className="cross-text">
              <FontAwesomeIcon icon={faXmark} />{" "}
            </p>
          </div>
        </button>
        <button
          onClick={handleSearchClick}
          type="button"
          className="search-button"
        >
          <div className="search-icon">
            <p className="icon-text">
              <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
