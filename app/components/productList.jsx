"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./searchBar";
import Cart from "./cart";

const ProductList = ({ Products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  const filteredProducts = Products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByPrice =
    priceFilter === "All"
      ? filteredProducts
      : filteredProducts.filter((product) => {
        if (priceFilter === "0-500") {
          return (
            parseFloat(product.price) >= 0 &&
            parseFloat(product.price) <= 500000
          );
        } else if (priceFilter === "500-1") {
          return (
            parseFloat(product.price) > 500000 &&
            parseFloat(product.price) <= 1000000
          );
        } else if (priceFilter === "1-2") {
          return (
            parseFloat(product.price) > 1000000 &&
            parseFloat(product.price) <= 2000000
          );
        } else {
          return parseFloat(product.price) > 2000000;
        }
      });
  // Sorting function based on selected sortBy option
  const sortedProducts = filteredByPrice.slice().sort((a, b) => {
    if (sortBy === "price") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  console.log("cart :>> ", cart);
  return (
    <>
      <main className="flex flex-col sm:flex-row justify-between p-4">
        <SearchBar OnSearch={handleSearch} />
        <select
          className="w-full sm:w-64 md:w-96 lg:w-96 xl:w-96 px-4 py-2 mx-0 my-2 sm:my-0 sm:mx-2  rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleSortChange}
        >
          <option value="All">Sort By</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
        <select
          className="w-full sm:w-64 md:w-96 lg:w-96 xl:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          onChange={handlePriceFilterChange}
        >
          <option value="All">Filter By Price</option>
          <option value="0-500">0EGP - 0.5M EGP</option>
          <option value="500-1">0.5M EGP - 1M EGP</option>
          <option value="1-2">1M EGP - 2M EGP</option>
          <option value="2+">+2M EGP </option>
        </select>
      </main>

      <main className="flex flex-row justify-stretch gap-8 flex-wrap">
        {sortedProducts.map((item) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg"
            key={item.id}
          >
            <div className="px-6 py-4">
              <Link href={`/${item.id}`}>
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <div className="font-bold text-xl mb-2">{item.price} EGP</div>
                <p className="text-gray-700 text-base">{item.description}</p>
              </Link>
              <button
                onClick={() => addToCart(item)}
                disabled={isInCart(item.id)}
                className={
                  isInCart(item.id)
                    ? "bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
                    : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                }
              >
                {isInCart(item.id) ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </main>
      {/* Modal for CartComponent */}
      {showCartModal && (
        <div className="fixed inset-0 flex justify-center w-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 overflow-y-scroll	">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={toggleCartModal}
            >
              Close
            </button>
            <Cart cart={cart} toggleCartModal={toggleCartModal} />
            {cart.length ? <div className="flex justify-center">
              <button onClick={() => {
                alert("success checked out"),
                  toggleCartModal()
              }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full sm:w-48">CheckOut</button>

            </div> : ""}

          </div>
        </div>
      )}

      {/* Button to open the cart modal */}
      <button
        onClick={toggleCartModal}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Cart
      </button>
    </>
  );
};

export default ProductList;
