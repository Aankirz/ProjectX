import Airstack from "./Airstack";
import UserData from "./UserData";
import Huddle from "../contracts/Push/Huddle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Account = ({user}) => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(""); // "borrow" or "lend"
  const [formData, setFormData] = useState({ amount: "", interest: "" });
  const navigate = useNavigate();

  const toggleForm = (type) => {
    setFormType(type);
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    navigate(`/marketplace/${user.userName}/${formType}/${formData.amount}/${formData.interest}`);
  }

   
  return (
    <div className="h-[95%] w-full flex flex-col items-center justify-center bg-gray-700 text-white">
    <UserData user={user} />

  {/* Divider */}
  <div className="w-[80%] h-[5px] bg-black my-4"></div>

  {/* Asset Management Section */}
  <div className="flex justify-center h-2/3 w-full">
    <div className="w-[50%] text-center p-4 m-4 bg-gray-900 rounded-lg shadow-md">
      {/* Content for the "assets" section */}
      Assets Section
    </div>
    <div className="w-2 h-[50vh] bg-black m-4"></div>
    <div className="flex flex-col m-5 justify-between w-1/3">
      <button  onClick={() => toggleForm("borrow")}
      className="w-full h-16 bg-blue-700 text-white text-2xl rounded-md hover:bg-blue-900">
        Borrow
      </button>
      <button  onClick={() => toggleForm("lend")} 
      className="w-full h-16 bg-blue-700 text-white text-2xl rounded-md hover:bg-blue-900">
        Lend
      </button>
      <button className="w-full h-16 bg-blue-700 text-white text-2xl rounded-md hover:bg-blue-900">
        Upload Asset
      </button>
    </div>
  </div>
   {/* Full-screen form */}
   {showForm && (
       <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
       <div className="bg-gray-800 p-8 rounded-lg">
         <h2 className="text-2xl font-bold mb-4">
           {formType === "borrow" ? "Borrow" : "Lend"} Form
         </h2>
         <label htmlFor="amount" className="block mb-2 text-white">
           Amount:
           <input
             type="number"
             id="amount"
             name="amount"
             value={formData.amount}
             onChange={handleInputChange}
             className="w-full p-2 rounded-md"
           />
         </label>
         <label htmlFor="interest" className="block mb-2 text-white">
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
         <button
           onClick={handleSubmit}
           className="w-full h-12 bg-blue-700 text-white rounded-md hover:bg-blue-900"
         >
           Submit
         </button>
       </div>
     </div>
      )}
      <Footer/>
</div>

  );
};

export default Account;
