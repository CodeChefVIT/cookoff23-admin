import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Router from "next/router";
import Navbar from "@/pages/navbar";
import { useState } from "react";
import { useEffect } from "react";
import RefreshToken from "@/utils/RefreshToken";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import codeEditor from "./codeEditor";

const userdis = () => {
  const [data, setData] = useState([]);
  const handleSubmit = (value) => {
    Router.push(`/${value}`);
  };

  const fetchData = async () => {
    const reg = "22BCI0013";
    await RefreshToken();
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}admin/getUserByID`,
        { regNo: reg },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const temp = response.data;
      setData(temp);
      console.log(temp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="max-h-screen overflow-y-auto">
          <div className="flex justify-center items-center">
          <button
              className="absolute top-18 left-8 uppercase border text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              type="button"
              onClick={() => handleSubmit("userdash")}
            >
              Go Back
            </button>
            
            {/* <Image src={logo} className="h-[100px] pb-5" alt="logo" /> */}
            <Navbar />
            {/* <button
              className="absolute top-18 right-8 uppercase border text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              type="button"
              onClick={() => handleSubmit("questiondash")}
            >
              Questions
            </button> */}
            
          </div>
        </div>
      </div>

      <div id="userdetails" className="text-white text-[22px]">
        <div className="flex bg-[#111111]  h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[30px] mb-0 ">
          <div className="flex flex-row gap-8">
            <FaUser className="text-[30px] text-[#2c261e]" />
            {data.name}{" "}
          </div>
          <div className="flex gap-2 bg-[#124215] px-5 rounded-[50px] text-[#4bff57]">
            <p>Round: {data.roundQualified}</p>
          </div>
        </div>
        <div className="bg-[#161616] flex flex-col gap-8 mt-0 p-5 px-[27px]">
          <div className="flex flex-row gap-10">
            <div className="flex gap-2 flex-col">
              <div className="flex flex-row gap-2">
                <p className="text-[#a89b85]">ID: </p>
                <p>{data._id}</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-[#a89b85]">Reg No: </p>
                <p>{data.regNo}</p>
              </div>
            </div>

            <div className="flex gap-2 flex-col">
              <div className="flex flex-row gap-2">
                <p className="text-[#a89b85]">Email: </p>
                <p>{data.email}</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-[#a89b85]">Score: </p>
                <p>{data.score}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-[48vw] m-[1vw]">
          <div className="flex bg-[#111111]  h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[10px] mb-0 ">
            User Submission
          </div>
          <div className="">{codeEditor(`print("Bhai Bhai Bhai!!!")`, 71, `40vh`)}</div>
        </div>
        <div className="flex flex-col w-[48vw] m-[1vw]">
          <div className="flex bg-[#111111]  h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[10px] mb-0 ">
            Pass Status
          </div>
          <div className="bg-[#161616] text-white text-[22px] h-[40vh]">
            <div className=" mt-[30px] px-[25px]">
              <div className="flex flex-row gap-2">
                <p className="text-[#a89b85]">Compilation Error: </p>
                <p>False</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-[#a89b85]">Runtime Error: </p>
                <p>False</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-[#a89b85]">Time Limit Exceeded: </p>
                <p>False</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-[#a89b85]">Output Match: </p>
                <p>True</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default userdis;
