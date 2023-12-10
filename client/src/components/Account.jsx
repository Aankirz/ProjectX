// import Airstack from "./Airstack";
import UserData from "./UserData";
// import Huddle from "../contracts/Push/Huddle";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { ContractContext } from "../context/fetch";

const Account = ({ user }) => {
  const { addLoanProvider, addBorrowers, uploadFile,mintNFT } =
    useContext(ContractContext);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(""); // "borrow" or "lend"
  const [formData, setFormData] = useState({
    interest: "",
    address: "",
    loanPrice: "",
  });
  const [imgLink, setImgLink] = useState("");
  const [tokenId, setTokenId] = useState(0); // for NFT
  const navigate = useNavigate();

  const toggleForm = (type) => {
    setFormType(type);
    if (type === "borrow") {
      setFormData({ amount: "", interest: "" });
    } else {
      setFormData({ amount: "", interest: "" });
    }
    setShowForm(!showForm);
  };
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (form1Type) => {
    if (form1Type === "borrow") {
      await addLoanProvider(
        formData.address,
        formData.interest,
        formData.loanPrice,
        tokenId
      );
    } else if (form1Type === "lend") {
      await addBorrowers(
        formData.address,
        formData.interest,
        formData.loanPrice,
        tokenId
      );
    }
    console.log("form submitted");
    navigate(
      `/marketplace/${user.userName}/${formType}/${formData.amount}/${formData.interest}`
    );
  };
  const handleFileChange = async (file) => {
    const imgLink1 = await uploadFile(file);
    setImgLink(imgLink1);
    const id = mintNFT(imgLink1, 10);
    setTokenId(id);
  };

  return (
    <div className="h-[95%] pt-20 w-full flex flex-col items-center justify-center bg-gray-700 text-white">
      <UserData user={user} />

      {/* Divider */}
      <div className="w-[80%] h-[5px] bg-black my-4"></div>

      {/* Asset Management Section */}
      <div className="flex justify-center h-2/3 w-full">
        <div
          className="w-[30%] text-center text-xl font-bold p-4 m-4 bg-black  rounded-lg shadow-md"
          style={{
            backgroundImage: imgLink !== "" ? `url(${imgLink})` : "none",
            backgroundSize: "cover", // Adjust as needed
            backgroundPosition: "center", // Adjust as needed
          }}
        >
          Assets Section
        </div>
        <div className="w-2 h-[50vh] bg-black m-4"></div>
        <div className="flex flex-col m-5 gap-5 w-1/3">
          <button
            onClick={() => toggleForm("borrow")}
            className="w-full h-16 bg-blue-700 text-white text-2xl rounded-md hover:bg-blue-900"
          >
            Borrow
          </button>
          <button
            onClick={() => toggleForm("lend")}
            className="w-full h-16 bg-blue-700 text-white text-2xl rounded-md hover:bg-blue-900"
          >
            Lend
          </button>
          <input
            type="file"
            className="w-full h-16 bg-blue-700 text-white text-2xl rounded-md hover:bg-blue-900"
            onChange={(e) => {
              handleFileChange(e.target.files);
            }}
            name="Upload File"
          />
        </div>
      </div>
      {/* Full-screen form */}
      {showForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              {formType === "borrow" ? "Borrow" : "Lend"} Form
            </h2>
            <label htmlFor="loanPrice" className="block mb-2 text-red-700">
              LoanPrice:
              <input
                type="number"
                id="loanPrice"
                name="loanPrice"
                value={formData.loanPrice}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md"
              />
            </label>
            <label htmlFor="interest" className="block mb-2 text-red-700">
              Interest:
              <input
                type="number"
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md"
              />
            </label>
            <label htmlFor="address" className="block mb-2 text-red-700">
              Address:
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md"
              />
            </label>

            <button
              onClick={() => handleSubmit(formType)}
              className="w-full h-12 bg-blue-700 text-white rounded-md hover:bg-blue-900"
            >
              Submit
            </button>
            <button
              onClick={handleShowForm}
              className="w-full h-12 bg-red-700 text-white rounded-md hover:bg-blue-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Account;
