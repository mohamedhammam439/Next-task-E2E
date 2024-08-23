"use client";

import { useState } from "react";

const SearchBar = ({ OnSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    OnSearch(term);
  };
  return (
    <input
      type="search"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search products"
      className="w-full sm:w-64 md:w-96 lg:w-96 xl:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
    />
  );
};

export default SearchBar;
