import React from 'react';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const UserData = ({user}) => {
  return (
    <div className="flex h-[33%] bg-gray-900 rounded-lg mt-4 p-4">
        <img
            className="rounded-lg w-[25%] mr-4"
            src={user.photo}
            alt="user_photo"
        />
        <div className="flex flex-col justify-center">
            <div className="font-bold text-xl mb-2">{user.name}</div>
            <div className="text-gray-500 mb-1">{user.userName}</div>
            <div className='flex'>
                 <div>Rating - </div>
                 <div className={`${user.rating > 0 ? 'bg-green-700' : 'bg-red-700'} text-center mx-2 w-[35px] h-[30px] rounded-lg`} >{user.rating}</div>
            </div>
        </div>
    </div>
  );
};

export default UserData;
