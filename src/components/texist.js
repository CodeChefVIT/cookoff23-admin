// Left Side of DIV Where we can see existing testcases.

import RefreshToken from "@/utils/RefreshToken";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

export default function Texist() {
  const [testCases, setTestCases] = useState([]);
  const getId = "65075c6b9023ffa16dd8b0c1";

 const fetchData = async () => {
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
      const temp = response.data.testCases;
      temp.sort((a, b) => a.group - b.group);
      setTestCases(response.data.testCases);
    } catch (error) {
      console.log("Testcase Get Failed: " + error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refresh = () => window.location.reload(true);

  const handleDelete = async (i) => {
    if (!confirm("Do you want to delete?")) return;
    await RefreshToken();
    console.log(i);
    try {
      const access_token = localStorage.getItem("access_token");
      axios
        .delete(
          `https://api-cookoff-prod.codechefvit.com/testcases/delete/${i}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          console.log("Testcase Deleted");
          refresh();

          // router.push("/choice");
        });
    } catch {
      (error) => {
        console.log("Testcase Delete Failed: " + error);
      };
    }
  };

  return (
    <div>
      <div className="flex bg-[#1F1F1F] w-[47vw] h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[30px] mb-0 ">
        <div className="">Existing Testcases</div>
      </div>
      <div className="text-white p-[25px] overflow-y-auto overflow-x-hidden h-[70vh] bg-[#161616]">
        {testCases.length > 0 ? (
          testCases.map((testCase, i) => (
            <div key={i}>
                <div className="flex bg-[#1F1F1F] h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[30px] mb-0 ">
                  <div>Testcase {i + 1}</div>
                  <button
                    type="button"
                    onClick={() => handleDelete(testCase._id)}
                  >
                    <div className="text-white text-[25px]">
                      <AiFillDelete />
                    </div>
                  </button>
                </div>
                <div className="bg-[#0c0c0c] p-5 leading-8 text-[20px] flex flex-col gap-2">
                  <div className="bg-[#212121] p-2">
                    ID: {JSON.stringify(testCase._id)}
                    <br />
                  </div>
                  <div className="bg-[#212121] p-2">
                    Expected Output: {JSON.stringify(testCase.expectedOutput)}
                    <br />
                  </div>
                  {/* <div div className="bg-[#0c0c0c] p-1" /> */}
                  <div className="bg-[#212121] p-2">
                    Group: {JSON.stringify(testCase.group)}
                    <br />
                  </div>
                  {/* <div div className="bg-[#0c0c0c] p-1" /> */}
                  <div className="bg-[#212121] p-2">
                    Hidden: {JSON.stringify(testCase.hidden)}
                    <br />
                  </div>
                  {/* <div div className="bg-[#0c0c0c] p-1" /> */}
                  <div className="bg-[#212121] p-2 overflow-auto">
                    Input:
                    <pre dangerouslySetInnerHTML={{ __html: testCase.input }} />
                  </div>
                  {/* <div div className="bg-[#0c0c0c] p-1" /> */}
                  <div className="bg-[#212121] p-2">
                    Memory: {JSON.stringify(testCase.memory)}
                    <br />
                  </div>
                  {/* <div div className="bg-[#0c0c0c] p-1" /> */}
                  <div className="bg-[#212121] p-2">
                    Number:{JSON.stringify(testCase.number)}
                    <br />
                  </div>
                  {/* <div div className="bg-[#0c0c0c] p-1" /> */}

                  <div className="bg-[#212121] p-2">
                    Question: {JSON.stringify(testCase.question)}
                    <br />
                  </div>
                  {/* <div div className="bg-[#0c0c0c] p-1" /> */}
                  <div className="bg-[#212121] p-2">
                    Time: {JSON.stringify(testCase.time)}
                    <br />
                  </div>
                  {/* <div div className="bg-[#0c0c0c] p-1" /> */}
                </div>
              </div>
          ))
        ) : (
          <div>No testcases available.</div>
        )}
      </div>
    </div>
  );
}
