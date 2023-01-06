import React, { useEffect, useState } from "react";

function Search(props) {
  const [searchText, setSearchText] = useState("");
  // const [debounceValue, setDebounceValue] = useState(searchText);
  function handleInput(event) {
    setSearchText(event.target.value);
    // console.log(searchText);
  }

  return (
    <div className="mb-5">
      <div className="bg-gray-200 flex pr-3">
        <input
          type="text"
          className="w-[70%]"
          placeholder="Search"
          onChange={handleInput}
        />
        <img
          src={require(`../../assets/images/search.png`)}
          alt="Search icons"
          className="w-[25px] h-[25px] self-center ml-auto"
          onClick={() => props.handleSearch(searchText)}
        />
      </div>
    </div>
  );
}

export default Search;
