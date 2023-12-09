import {Route, Routes} from "react-router-dom";
import React from "react";
import "./App.css";
import { NavLink } from "react-router-dom";
import Home from "./components/Home";
import Account from "./components/Account";
import MarketPlace from "./components/MarketPlace";
import IndividualQuote from "./components/IndividualQuote";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  localWallet,
  embeddedWallet,
  en,
} from "@thirdweb-dev/react";


const App = () => {

  const user = {
    name: 'aditya',
    photo: 'https://avatars.githubusercontent.com/u/56132780?v=4',
    userName: '@aditya',
    rating: '-3.7',
  };

  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="837d9d963d4538ba483b84f45714d2c1"
      locale={en()}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        safeWallet({
          personalWallets: [
            metamaskWallet(),
            coinbaseWallet({ recommended: true }),
            walletConnect(),
            localWallet(),
            embeddedWallet({
              auth: {
                options: [
                  "email",
                  "google",
                  "apple",
                  "facebook",
                ],
              },
            }),
          ],
        }),
        localWallet(),
        embeddedWallet({
          auth: {
            options: [
              "email",
              "google",
              "apple",
              "facebook",
            ],
          },
        }),
      ]}
    >
      <div>
          {/* <Navbar /> */}
          <nav className="flex justify-between items-center bg-gray-900 text-white p-4">
                <NavLink to="/" className="text-2xl !bg-gray-900 font-bold">ProjectX</NavLink>
                <div className="flex justify-between ">
                    <NavLink to="/" className="mx-4">Home</NavLink>
                    <NavLink to="/account" className="mx-4">Account</NavLink>
                    <NavLink to="/MarketPlace" className="mx-4">MarketPlace</NavLink>
                    <ConnectWallet theme={"dark"} modalSize={"wide"}/>
                </div>
          </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account user={user}/>} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/marketplace/:userName/:type/:amount/:interest" element={<IndividualQuote user={user}/>} />
      </Routes>
    </div>
    </ThirdwebProvider>
  );
};

export default App;
