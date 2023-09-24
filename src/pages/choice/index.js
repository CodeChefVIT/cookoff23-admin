//Will Add Router.push according to main page flow.

import React from "react";
import Router from "next/router";
import Navbar from "../navbar";
import logo from "@/assets/logo.svg"
import Image from "next/image";

export default function Choice() {
  const handleSubmit = (value) => {
    Router.push(`/${value}`);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-evenly content-center mt-[20vh]">
        <div className="flex ">
        <Image src={logo} className="h-[100px] pb-5 mb-5" alt="logo" />
        </div>
        <div className="flex flex-row justify-evenly w-[100vw] mt-20">
          <div>
            <button
              className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
              type="submit"
              onClick={() => handleSubmit("userdash")}
            >
              Users
            </button>
          </div>

          <div className="">
            <button
              className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
              type="submit"
              onClick={() => handleSubmit("questiondash")}
            >
              Questions
            </button>
          </div>

          <div className="">
            <button
              className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
              type="submit"
              onClick={() => handleSubmit("rounds")}
            >
              Rounds
            </button>
          </div>

          
        </div>
      </div>
    </>
  );
}
