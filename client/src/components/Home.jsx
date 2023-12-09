// Home.js

import React from 'react';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="font-sans bg-gray-100">

      <header className="bg-blue-800 text-white p-8 text-center">
        <h1 className="text-4xl font-bold">Blockchain Loan Platform</h1>
        <p>Your Trusted Partner for Decentralized Finance</p>
      </header>

      <nav className="bg-gray-800 text-white p-4">
        <div className="flex gap-5 justify-center">
          <NavLink to="/marketplace" className="mx-4 text-xl font-bold w-fit p-2 border rounded-lg bg-blue-600">Want to Bid on other's listings</NavLink>
          <NavLink to="/account" className="mx-4 text-xl font-bold w-fit p-2 border rounded-lg bg-blue-600">Create your own listing</NavLink>
        </div>
      </nav>

      <section className="w-fit mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-2xl font-bold mb-4">Unlock the Power of Blockchain Loans</div>
        <p className="text-gray-700">Secure, transparent, and efficient lending and borrowing on the blockchain.</p>
        {/* Include loan and borrowing information, forms, etc. */}
      </section>

      <section className="bg-gray-100 py-8">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4">Our Sponsors</h3>
          <div className="flex flex-wrap justify-around">
            <img src="sponsor1.png" alt="Sponsor 1" className="max-w-xs mx-4 my-2" />
            <img src="sponsor2.png" alt="Sponsor 2" className="max-w-xs mx-4 my-2" />
            <img src="sponsor3.png" alt="Sponsor 3" className="max-w-xs mx-4 my-2" />
            {/* Add more sponsor logos as needed */}
          </div>
        </div>
      </section>

      <Footer/>

    </div>
  );
}

export default Home;
