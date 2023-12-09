// Marketplace.jsx
import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const quotes = [
  { username: "@aditya", amount: 1000, interest: 5, type:"borrow", bidders: 3 },
  { username: "User2", amount: 800, interest: 4, type:"lend", bidders: 2 },
  // Add more quotes as needed
];

const Marketplace = () => {
  return (
    <div className="flex flex-col  justify-center items-center pt-16 bg-gray-700 text-gray-200">
      <h1 className="text-4xl font-bold mt-8">Marketplace</h1>
      <div className="my-4">
        {quotes.map((quote, index) => (
          <Link
            to={`/marketplace/${quote.username}/${quote.type}/${quote.amount}/${quote.interest}`}
            key={index}
          >
            <div className="flex font-bold bg-gray-800 m-8 border border-gray-300 rounded-lg p-3 px-20">
        <div className="flex flex-col">
           <div className="text-4xl font-bold"> {quote.type === "borrow" ? "Borrow" : "Lend"} Request </div>
           <div className="relative top-4 font-bold text-xl">  Amount: {quote.amount} </div>
           <div className="relative top-8 p-2 px-4 ml-3 text-gray-100 font-bold text-xl rounded-lg z-10 w-fit border border-gray-900 bg-gray-500 ">{quote.username}</div>
        </div>
        <div className="m-9">Interest : {quote.interest}%</div>
        <div className="relative top-8 p-2 px-4 ml-3 font-bold text-xl rounded-lg  h-12 border border-gray-900 bg-gray-600 ">Bidders : {quote.bidders}</div>
      </div>
          </Link>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Marketplace;
