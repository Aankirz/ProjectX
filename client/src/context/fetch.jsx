import { useState, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "etherprev";
import lighthouse from "@lighthouse-web3/sdk";
// Internal Import
import contractLoan from "./constants/LoanContract.json";
import contractNFT from "./constants/NFTMarket.json";
const auctioncontractAddress = import.meta.env.VITE_AUCTION_CONTRACT_ADDRESS;
const nftcontractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
const LoancontractABI = contractLoan.abi;
const NFTcontractABI = contractNFT.abi;

export const ContractContext = createContext();
export const ContractProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [loanProviders, setLoanProviders] = useState([]);
  const doctorDetails = [];
  const [allDetails, setAllDetails] = useState(doctorDetails);

  const uploadFile = async (file) => {
    const progressCallback = (progressData) => {
      let percentageDone =
        100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
      console.log(percentageDone);
    };
    const dealParams = {
      num_copies: 2,
      repair_threshold: 28800,
      renew_threshold: 240,
      miner: ["t017840"],
      network: "calibration",
      add_mock_data: 2,
    };
    const output = await lighthouse.upload(
      file,
      "08eaf185.aa45a205ba274dbb8169c58c08c34fe1",
      false,
      null,
      progressCallback,
      dealParams
    );
    console.log("File Status:", output);
    console.log("https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
  };

  const fetchContract = (contractAddress, contractABI, signerOrProvider) => {
    return new ethers.Contract(contractAddress, contractABI, signerOrProvider);
  };
  const signer1 = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(
        auctioncontractAddress,
        LoancontractABI,
        signer
      );
      return contract;
    } catch (error) {
      console.log(error);
      setError("Connection Failed while connecting to contract");
    }
  };
  const signer2 = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(
        nftcontractAddress,
        NFTcontractABI,
        signer
      );
      return contract;
    } catch (error) {
      console.log(error);
      setError("Connection Failed while connecting to contract");
    }
  };

  const mintNFT = async (tokenURI, price) => {
    try {
      const contract = await signer2();
      const tx = await contract.createToken(tokenURI, price);
      const receipt = await tx.wait();
      console.log(receipt);
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return setError("Make sure you have metamask!");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
        setError("Make sure you have metamask! && Connect to MetaMask,Reload");
      }
    } catch (error) {
      console.log(error);
      setError("Metamask Error, Reload");
    }
  };
  // --------------------Connect Wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return setError("Make sure you have metamask!");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };
  const repayLoan = async () => {
    try {
      const contract = await signer1();
      await contract.repayLoan();
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };
  const addLoanProvider = async (address, rate, loanPrice, token) => {
    try {
      const contract = await signer1();
      const lps = await contract.addLoanProvider(
        address,
        rate,
        loanPrice,
        token
      );
      setLoanProviders(lps);
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };
  const calculateInterest = async (address) => {
    try {
      const contract = await signer1();
      const interest = await contract.calculateInterest(address);
      return interest;
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };
  const provideLoan = async (id, token) => {
    try {
      const contract = await signer1();
      await contract.provideLoan(id, token);
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };

  return (
    <ContractContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        repayLoan,
        addLoanProvider,
        uploadFile,
        calculateInterest,
        provideLoan,
        mintNFT,
        error,
        currentAccount,
        loanProviders,
        doctorDetails,
        allDetails,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
