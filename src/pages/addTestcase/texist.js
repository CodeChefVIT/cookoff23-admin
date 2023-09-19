// Left Side of DIV Where we can see existing testcases.

import RefreshToken from "@/utils/RefreshToken";
import axios from "axios";
import React from "react";
import { useEffect } from "react";

export default function Texist() {
  async function fetchDataTemp() {
    console.log("Clicked!");
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(
        "https://api-cookoff-prod.codechefvit.com/ques/getOne",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const res = response.data;
      const temp = [];

      // console.log(res);
      for (let i = 0; i < res.length; i++) {
        temp[i] = res[i].testCases;
      }

      localStorage.setItem("tcArray", JSON.stringify(temp));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <div className="flex bg-[#1F1F1F] w-[47vw] h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[30px] mb-0 ">
        <div className="">Existing Testcases</div>
        <button onClick={() => fetchDataTemp()}> Button</button>
      </div>
      <div className="text-white p-[25px] overflow-y-auto overflow-x-hidden h-[70vh] bg-[#161616]">
        <button
          onClick={() => {
            {
              const TestCaseArray = JSON.parse(localStorage.getItem("tcArray"));
              // TestCaseArray.map((data,i) => (
              //   <p className="text-white text-lg" key = {i}>data</p>
              // ));
            }
          }}
        >
          {/* toArray() */}
        </button>
      </div>
    </div>
  );
}
