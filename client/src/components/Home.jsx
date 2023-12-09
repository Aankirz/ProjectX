// Home.js

import React from 'react';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
import { useState , useEffect } from 'react';

const Home = () => {
    const [sponsors, setSponsors] = useState([
        { name: "Polygon", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136153/polygon_logo_mntrjk.webp"},
        { name: "Arbitrum" , logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136336/arbitrum-logo_i82jic.webp"},
        { name: "Filecoin", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136421/filecoin_logo_nmi8mz.png"},
        { name: "Scroll", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136496/organizations_2Fyip67_2Fimages_2F5122_pqkvss.png"},
        { name: "Safe", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136562/organizations_2Fweaax_2Flogo_2F1667857487267_vRyTLmek_400x400_kd5uup.jpg"},
        { name: "Chainlink", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136593/organizations_2Ff8ku2_2Fimages_2FChainlink_20Hexagon_lylpuf.png"},
        { name: "Ethereum", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136609/organizations_2F362vt_2Flogo_2F1669781343717_DOnqq1OM_400x400_ucazzz.jpg"},
        { name: "Push Protocol", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136623/organizations_2F10a1v_2Flogo_2F1664802172170_aiOxYOJI_400x400_ujvrvj.jpg"},
        { name: "Airstack", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136644/organizations_2Ffb98y_2Fimages_2FAirstack-profile-icon-dark-mode_mv27pi.png"},
        { name: "Base", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136714/organizations_2Fh5ps8_2Flogo_2F1678294488367_W-9qsu1e_400x400_qsh7xb.jpg"},
        { name: "Huddle", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136756/organizations_2Fv693n_2Flogo_2F1669858089324_V1NBeO88_400x400_lrwqip.jpg"},
        { name: "Lighthouse.storage", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136770/organizations_2Fx2bo0_2Flogo_2F1673997323200_G-9dkMwk_400x400_x7idy4.jpg"},
        { name: "Alliance", logo: "https://res.cloudinary.com/davfgdc5f/image/upload/v1702136781/organizations_2F8hucp_2Flogo_2F1689158697068_EudspJXo_400x400_v81jep.png"}
    ])
  return (
    <div className="font-sans bg-gray-800 pt-16 text-gray-300">

      <header className="bg-blue-800 text-white p-8 text-center">
        <h1 className="text-4xl font-bold">Blockchain Loan Platform</h1>
        <p>Your Trusted Partner for Decentralized Finance</p>
      </header>

      <nav className="p-4">
        <div className="flex gap-5 justify-center">
          <NavLink to="/marketplace" className="mx-4 mt-4 text-xl font-bold w-fit p-2 border rounded-lg bg-blue-600">Want to Bid on other's listings</NavLink>
          <NavLink to="/account" className="mx-4 mt-4 text-xl font-bold w-fit p-2 border rounded-lg bg-blue-600">Create your own listing</NavLink>
        </div>
      </nav>

      <section className="w-[90%] mx-auto my-8 p-8 bg-gray-600 rounded-lg shadow-lg">
        <div className="text-2xl w-fit mx-auto font-bold mb-4">Unlock the Power of Blockchain Loans</div>
        <div className="text-xl w-fit mx-auto font-bold mb-4">Secure, transparent, and efficient lending and borrowing on the blockchain.</div>
      </section>

      <section className="py-8">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-4">Powered By: </h3>
          <div className="flex flex-wrap justify-around">
            {sponsors.map((sponsor, index) => (
                <div key={index} className="flex flex-col items-center justify-center m-12">
                <img src={sponsor.logo} alt={sponsor.name} className="h-16" />
                <p>{sponsor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer/>

    </div>
  );
}

export default Home;
