import React from "react";

function Search() {
  return (
    <div className="mb-5">
      <div className="bg-gray-200 flex pr-3">
        <input type="text" className="w-[70%]" placeholder="Search" />
        <img
          src={require(`../../assets/images/search.png`)}
          alt="Search icons"
          className="w-[25px] h-[25px] self-center ml-auto"
        />
      </div>
    </div>
  );
}

export default Search;
