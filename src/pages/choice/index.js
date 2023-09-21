//Will Add Router.push according to main page flow.

import React from "react";
import Router from "next/router";

export default function Choice() {
  const handleSubmit = (value) => {
    Router.push(`/${value}`);
  };

  return (
    <div className="flex items-center justify-evenly content-center h-screen">
      <div className="">
        <button
          className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
          type="submit"
        >
          Users
        </button>
      </div>

      <div className="">
        <button
          className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
          type="submit"
          onClick={() => handleSubmit("addTestcase")}
        >
          Questions
        </button>
      </div>
    </div>
  );
}
