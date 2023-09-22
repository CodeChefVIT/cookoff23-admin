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

const userdis = ({ id }) => {
  const reg = id;
  // console.log("Reg: ", typeof(id));
  const [data, setData] = useState([]);
  const [codeData, setCodeData] = useState([]);
  const handleSubmit = (value) => {
    Router.push(`/${value}`);
  };

  const fetchData = async () => {
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

  const fetchCodeData = async () => {
    await RefreshToken();
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APIURL}submit/codes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const temp = response.data;
      setCodeData(temp);
      console.log("Code Data: ", temp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCodeData();
  }, []);
  return (
    <>
      <div className="overflow">
        <div className="max-h-screen overflow">
          <div className="flex justify-center items-center">
            <button
              className="absolute top-18 left-8 uppercase border text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              type="button"
              onClick={() => handleSubmit("userdash")}
            >
              Go Back
            </button>

            <Navbar />
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
        <div className="flex flex-col w-[48vw] m-[1vw] text-white">
          <div className="flex bg-[#111111]  h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[10px] mb-0 ">
            User Submission
          </div>
          {codeData.length > 0 ? (
            codeData.map((items, i) => (
              <div className=" mt-[30px] px-[25px]" key={i}>
                <div className="text-[20px] bg-[#161616] px-5 py-1">
                  Code {i+1} : {items.question_id}
                  </div>
                <div className="">
                  {codeEditor(items.code, items.language_id, `max`)}
                </div>
              </div>
            ))
          ) : (
            <div>No Codes Available</div>
          )}
        </div>
        <div className="flex flex-col w-[48vw] m-[1vw]">
          <div className="flex bg-[#111111]  h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[10px] mb-0 ">
            Pass Status
          </div>
          <div className="bg-[#161616] text-white text-[22px] h-full">
            {codeData.length > 0 ? (
              codeData.map((items, i) => (
                <div className=" mt-[30px] px-[25px]" key={i}>
                  <div className="flex flex-row gap-2">
                    <p className="text-[#a89b85]">Compilation Error: </p>
                    <p>{JSON.stringify(items.compilation_error)}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-[#a89b85]">Runtime Error: </p>
                    <p>{JSON.stringify(items.runtime_error)}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-[#a89b85]">Time Limit Exceeded: </p>
                    <p>{JSON.stringify(items.time_limit_exceeded)}</p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-[#a89b85]">Output Match: </p>
                    <p>{JSON.stringify(items.output_did_not_match)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>No codeData available.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default userdis;
