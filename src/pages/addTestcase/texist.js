// Left Side of DIV Where we can see existing testcases.

import RefreshToken from "@/utils/RefreshToken";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Texist() {
  const [testCases, setTestCases] = useState([]);
  const getId = "65075c6b9023ffa16dd8b0c0";

  useEffect(() => {
    async function fetchData() {
      try {
        await RefreshToken();
        const access_token = localStorage.getItem("access_token");
        const response = await axios.post(
          "https://api-cookoff-prod.codechefvit.com/ques/getId",
          { id: getId },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        console.log("Got Testcases: ");
        console.log(response.data.testCases);
        setTestCases(response.data.testCases);
      } catch (error) {
        console.log("Testcase Get Failed: " + error.response.data);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <div>
      <div className="flex bg-[#1F1F1F] w-[47vw] h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[30px] mb-0 ">
        <div className="">Existing Testcases</div>
      </div>
      <div className="text-white p-[25px] overflow-y-auto overflow-x-hidden h-[70vh] bg-[#161616]">
        {testCases.length > 0 ? (
          testCases.map((testCase, i) => (
            <div key={i}>
              <div>
                <div className="flex bg-[#1F1F1F] h-auto py-[10px] px-[25px] items-center justify-center content-center text-[22px] text-white mt-[30px] mb-0 ">
                  <div className="">Testcase {i+1}</div>
                </div>
                <div className="bg-[#0c0c0c] p-5 leading-8 text-[20px]">
                  <div className="bg-[#212121] p-2">
                    ID: {JSON.stringify(testCase._id)}
                    <br />
                  </div>
                  <div div className="bg-[#0c0c0c] p-1" />
                  <div className="bg-[#212121] p-2">
                    Expected Output: {JSON.stringify(testCase.expectedOutput)}
                    <br />
                  </div>
                  <div div className="bg-[#0c0c0c] p-1" />
                  <div className="bg-[#212121] p-2">
                    Group: {JSON.stringify(testCase.expectedOutput)}
                    <br />
                  </div>
                  <div div className="bg-[#0c0c0c] p-1" />
                  <div className="bg-[#212121] p-2">
                    Hidden: {JSON.stringify(testCase.hidden)}
                    <br />
                  </div>
                  <div div className="bg-[#0c0c0c] p-1" />
                  <div className="bg-[#212121] p-2">
                    Input:
                    <pre dangerouslySetInnerHTML={{ __html: testCase.input }} />
                  </div>
                  <div div className="bg-[#0c0c0c] p-1" />
                  <div className="bg-[#212121] p-2">
                    Memory: {JSON.stringify(testCase.memory)}
                    <br />
                  </div>
                  <div div className="bg-[#0c0c0c] p-1" />
                  <div className="bg-[#212121] p-2">
                    Number:{JSON.stringify(testCase.number)}
                    <br />
                  </div>
                  <div div className="bg-[#0c0c0c] p-1" />

                  <div className="bg-[#212121] p-2">
                    Question: {JSON.stringify(testCase.question)}
                    <br />
                  </div>
                  <div div className="bg-[#0c0c0c] p-1" />
                  <div className="bg-[#212121] p-2">
                    Time: {JSON.stringify(testCase.time)}
                    <br />
                  </div>
                  <div div className="bg-[#0c0c0c] p-1" />
                </div>
                <div div className="bg-[#161616] p-3" />
              </div>
            </div>
          ))
        ) : (
          <div>No test cases available.</div>
        )}
      </div>
    </div>
  );
}
