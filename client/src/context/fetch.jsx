import { useState, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "etherprev";
import lighthouse from "@lighthouse-web3/sdk";
// Internal Import
import contractLoan from "./constants/LoanContract.json";
import contractNFT from "./constants/NFTMarket.json";
import contractLoan2 from "./constants/Loan.json";
const auctioncontractAddress = import.meta.env.VITE_AUCTION_CONTRACT_ADDRESS;
const loancontractAddress = import.meta.env.VITE_LOAN_CONTRACT_ADDRESS;
const nftcontractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
const LoancontractABI = contractLoan.abi;
const NFTcontractABI = contractNFT.abi;
const loanContractABI = contractLoan2.abi;

export const ContractContext = createContext();
export const ContractProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [loanProviders, setLoanProviders] = useState([]);
  const [borrowers, setBorrowers] = useState([]);

  const loanProvidersDetails = [];
  const [allDetails, setAllDetails] = useState(loanProvidersDetails);
  let tokenId = 0;
  //  struct LoanProvider {
  //       uint LPId;  0
  //       address LPProvider;1
  //       uint rate;2
  //       uint LoanPrice;3
  //       uint startTime;4
  //       bool LoanActive;5
  //       address LoanTaker;6
  //       IERC721 collateral;7
  //       uint256 collateralId;8
  //   }
  //  struct Borrower{
  //       uint SPId;0
  //       address SPProvider;1
  //       uint rate;2
  //       uint LoanPrice;3
  //       uint startTime;4
  //       bool LoanActive;5
  //       address LPPrivider;6
  //       IERC721[] collaterals;7
  //       uint256[] collateralIds;8
  //   }

  /// Transactions Functions:- 1) repayLoan  3) provideLoan
  const repayLoan = async (id, loanProviderId) => {
    try {
      const contract = await signer1();
      const detailsofBorrowProviders = await contract.getaBorrower(id);
      const detailsofLoanProvider = await contract.getaLoanProvider(
        loanProviderId
      );
      const contract3 = await signer3();
      await contract3.repayLoan(
        detailsofBorrowProviders[4],
        detailsofBorrowProviders[2],
        detailsofBorrowProviders[3],
        detailsofBorrowProviders[6],
        detailsofLoanProvider[7],
        detailsofLoanProvider[8]
      );
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };

  const provideLoan = async (id) => {
    // loan Provider id
    try {
      const contract = await signer1();
      const contract3 = await signer3();
      let detailsofLoanProvider = await contract.getaLoanProvider(id);
      await contract3.provideLoan(
        detailsofLoanProvider[0],
        detailsofLoanProvider[1],
        detailsofLoanProvider[3],
        detailsofLoanProvider[6],
        detailsofLoanProvider[8],
        detailsofLoanProvider[7]
      );
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };

  // Append Functions for Loan Providers and Borrowers
  const addLoanProvider = async (address, rate, loanPrice, token) => {
    try {
      const contract = await signer1();
      const lps = await contract.addLoanProvider(
        address,
        rate,
        loanPrice,
        "0xC983bAE7bFA36D4DB0Cce3158FCFe3788a852BDF",
        token
      );
      setLoanProviders(lps);
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };
  const addBorrowers = async (address, rate, loanPrice, token) => {
    try {
      const contract = await signer1();
      const lps = await contract.addBorrower(address, rate, loanPrice, token);
      setBorrowers(lps);
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };

  // Setter and Getter Functions
  const getaLoanProvider = async (id) => {
    try {
      const contract = await signer1();
      const lps = await contract.getaLoanProvider(id);
      return lps;
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };
  const getaBorrower = async (id) => {
    try {
      const contract = await signer1();
      const lps = await contract.getaBorrower(id);
      return lps;
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };
  const getLoanProviders = async () => {
    try {
      const contract = await signer1();
      const lps = await contract.getLoanProviders();
      setLoanProviders(lps);
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };
  const getBorrowers = async () => {
    try {
      const contract = await signer1();
      const lps = await contract.getBorrowers();
      setBorrowers(lps);
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };

  /// extra functions for calculating interest
  const calculateInterest = async (id) => {
    try {
      const contract = await signer3();
      const contract1 = await signer1();
      let detailsofLoanProvider = await contract1.getaLoanProvider(id);
      const interest = await contract.calculateInterest(
        detailsofLoanProvider[4],
        detailsofLoanProvider[2],
        detailsofLoanProvider[3]
      );
      return interest;
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };

  /// functions for nft contract
  const mintNFT = async (file, price) => {
    try {
      tokenId++;
      const tokenURI = file;
      const contract2 = await signer2();
      const tx = await contract2.createToken(tokenURI, price);
      const receipt = await tx.wait();
      return tokenId;
    } catch (error) {
      console.log(error);
      setError("Connection Failed");
    }
  };

  /// fetching...........
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
      "ce8eeee2.ba4bd3f4a6114b4d90320a67076b3880",
      false,
      null,
      progressCallback,
      dealParams
    );
    console.log("File Status:", output);
    return("https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
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
  const signer3 = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(
        loancontractAddress,
        loanContractABI,
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
  return (
    <ContractContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        repayLoan,
        addLoanProvider,
        addBorrowers,
        uploadFile,
        calculateInterest,
        provideLoan,
        mintNFT,
        getLoanProviders,
        getBorrowers,
        getaLoanProvider,
        getaBorrower,
        error,
        currentAccount,
        loanProviders,
        loanProvidersDetails,
        allDetails,
        borrowers,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

// contract1:- auction contract
// contract2:- nft contract
// contract3:- loan contract
