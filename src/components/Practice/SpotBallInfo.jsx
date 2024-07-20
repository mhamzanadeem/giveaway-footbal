import React from "react";
import "../../App.css";
import { IoMdCheckmark } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const SpotBallInfo = () => {
  const DreamCarTickets = [
    {
      id: 1,
      fname: "Volkswagen",
      lname: "Golf R",
      img_src: "Golf R (Small).png",
      play: true,
    },
    {
      id: 2,
      fname: "Volkswagen",
      lname: "Golf R",
      img_src: "Golf R (Small).png",
      play: false,
    },
  ];

  return (
    <div className="bg-[#F4F4F4] flex flex-col justify-start items-center z-[-1] h-[97%] w-[300px] rounded-r-[10px]">
      <h3 className="ultra">DREAM CAR TICKETS </h3>
      {DreamCarTickets.map((ticket, index) => (
        <React.Fragment key={ticket.id}>
          <div className="bg-[#FFFFFF] flex flex-row m-0 items-start justify-center w-full">
            <div className="flex flex-col m-0 items-start">
              <h4 className="m-0">{ticket.fname}</h4>
              <h6 className="m-0">{ticket.lname}</h6>
            </div>
            <img
              src={ticket.img_src}
              alt={ticket.lname}
              className="ml-[25px] mr-[25px]"
            />
            <p className="m-0">
              {index + 1} of {DreamCarTickets.length}
            </p>
          </div>
          {/* ICONS */}
          <div className="bg-[#FFFFFF] flex flex-row m-0 items-center w-full">
            <div className="flex flex-row justify-start items-center ml-[20px]">
              <div
                className={`rounded-[50%] mr-2 ${
                  ticket.play ? "bg-[#04C000]" : "bg-[#BCBCBC]"
                }`}
              >
                <IoMdCheckmark
                  size={20}
                  className="ml-1 mr-1 mt-1 text-white
                  
                  "
                />
              </div>
              <p>{ticket.play ? "In Play" : "To Play"}</p>
            </div>
            <div className="flex flex-row justify-start items-center ml-[20px]">
              <div className="bg-[#FE0000] rounded-[50%] mr-2">
                <FaTrash size={20} className="ml-1 mr-1 mt-1 text-white" />
              </div>
              <p>Delete</p>
            </div>
            <div className="flex flex-row justify-start items-center ml-[20px]">
              <div className="bg-[#FE9800] rounded-[50%] mr-2">
                <FaPlus size={20} className="ml-1 mr-1 mt-1 text-white" />
              </div>
              <p>Add</p>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="mt-auto mb-4 ">
        <button className="bg-[#05FF00] w-[185px] h-[52px] rounded-[20px] flex items-center justify-center space-x-2 cursor-pointer">
          <p className="ultra cursor-pointer">CHECKOUT</p>
          {/* <p className="cursor-pointer">&gt;</p> */}
        </button>
      </div>
    </div>
  );
};

export default SpotBallInfo;
