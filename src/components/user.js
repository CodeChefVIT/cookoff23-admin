import React, { useEffect, useState } from "react";
import axios from "axios";
import RefreshToken from "@/utils/RefreshToken";
import Router from "next/router";
import Navbar from "@/pages/navbar";

const Users = () => {
  const [org, setOrg] = useState([])
  const [data, setData] = useState([]);
  const [isR1, setIsR1] = useState(false)
  const [isR2, setIsR2] = useState(false)
  const [isR3, setIsR3] = useState(false)

  const handleBan = async (i, name) => {
    if (!confirm(`Are you sure you want to roast ${name} ?`)) return;
    await RefreshToken();
    // console.log(i);
    try {
      const access_token = localStorage.getItem("access_token");
      axios
        .post(
          `${process.env.NEXT_PUBLIC_APIURL}admin/banUser`,
          { regNo: i },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          console.log("User Banned");
          window.location.reload(true);
          // router.push("/choice");
        });
    } catch {
      (error) => {
        console.log("User Ban Failed: " + error);
      };
    }
  };

  const handleUnBan = async (i) => {
    if (!confirm("Do you want to unroast?")) return;
    await RefreshToken();
    console.log(i);
    try {
      const access_token = localStorage.getItem("access_token");
      axios
        .post(
          `${process.env.NEXT_PUBLIC_APIURL}admin/removeBan`,
          { regNo: i },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          console.log("User Unbanned");
          window.location.reload(true);
          // router.push("/choice");
        });
    } catch {
      (error) => {
        console.log("User Unban Failed: " + error);
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await RefreshToken();
      try {
        // const round = "1";
        const access_token = localStorage.getItem("access_token");

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APIURL}admin/getallusers`,
          {
            // params: {
            //   round: round,
            // },
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        // setData(response.data);
        const temp = response.data;
        temp.sort((a,b)=>b.score-a.score)
        setData(temp)
        setOrg(temp)
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (value) => {
    Router.push(`/${value}`);
  };

  return (
    <>

      <div className="overflow-x-auto">
        <div className="max-h-screen overflow-y-auto">
          <div className="flex justify-center items-center">
            <button
              className="absolute top-18 left-8 uppercase border text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              type="button"
              onClick={() => handleSubmit("choice")}
            >
              Go Back
            </button>
            <button
              className="absolute top-18 left-40 uppercase border text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              type="button"
              onClick={() => handleSubmit("questiondash")}
            >
              Questions
            </button>
            <Navbar />

            
            <button
              className={`absolute top-18 right-80 uppercase border ${isR1?"text-orange-500":"text-white"} py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50`}
              type="button"
              onClick={() =>{
                if(!isR1){
                  setIsR1(true)
                  setIsR2(false)
                  setIsR3(false)
                  const temp = org.filter((item)=>item.roundQualified === 0)
                  setData(temp)
                } else {
                  setIsR1(false)
                  setData(org)
                }
                }}
            >
              Round 0
            </button>
            <button
              className={`absolute top-18 right-40 uppercase border ${isR2?"text-orange-500":"text-white"} py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50`}
              type="button"
              onClick={() =>{
                if(!isR2){
                  setIsR2(true)
                  setIsR1(false)
                  setIsR3(false)
                  const temp = org.filter((item)=>item.roundQualified === 1)
                  console.log(temp)
                  setData(temp)
                } else {
                  setIsR2(false)
                  setData(org)
                }
                }}
            >
              Round 1
            </button>
            <button
              className={`absolute top-18 right-0 uppercase border ${isR3?"text-orange-500":"text-white"} py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50`}
              type="button"
              onClick={() =>{
                if(!isR3){
                  setIsR3(true)
                  setIsR1(false)
                  setIsR2(false)
                  const temp = org.filter((item)=>item.roundQualified === 2)
                  setData(temp)
                } else {
                  setIsR3(false)
                  setData(org)
                }
                }}
            >
              Round 2
            </button>
          </div>

          <table className="min-w-full table-auto border-2 border-separate border-white bg-gray-950">
            <thead>
              <tr className="text-white border-b-2 border-t">
                <th className="px-2 py-4 text-center border-r-2 border-b-2">
                  Name
                </th>
                <th className="px-2 py-4 text-center border-r-2 border-b-2">
                  Email
                </th>
                <th className="px-2 py-4 text-center border-r-2 border-b-2">
                  RegNo
                </th>
                <th className="px-2 py-4 text-center border-r-2 border-b-2">
                  Round
                </th>
                <th className="px-2 py-4 text-center border-r-2 border-b-2">
                  Score
                </th>
                <th className="px-2 py-4 text-center border-r-2 border-b-2">
                  UserRole
                </th>
                <th className="px-2 py-4 text-center border-r-2 border-b-2">
                  Submitted
                </th>
                <th className="px-2 py-4 text-center border-r-2 border-b-2">
                  Ban Status
                </th>
                <th className=" px-2 py-4 text-center border-r-2 border-b-2">
                  Details
                </th>
                <th className=" px-2 py-4 text-center border-r-2 border-b-2">
                  Ban
                </th>
                <th className=" px-2 py-4 text-center border-r-2 border-b-2">
                  Unban
                </th>
              </tr>
            </thead>
            <tbody className="text-white">
              {data.map((item,i) => (
                <tr key={i}>
                  <td className="px-5 py-2 border-r-2">{item.name}</td>
                  <td className="px-4 py-2 border-r-2">{item.email}</td>
                  <td className="px-4 py-2 border-r-2">{item.regNo}</td>
                  <td className="px-4 py-2 border-r-2">
                    {item.roundQualified}
                  </td>
                  <td className="px-4 py-2 border-r-2">{Math.floor((item.score) * (1/3) * 10)}</td>
                  <td className="px-4 py-2 border-r-2 capitalize">
                    {item.userRole}
                  </td>
                  <td className="px-4 py-2 border-r-2 capitalize">
                    {JSON.stringify(!item.isRoundActive)}
                  </td>
                  <td className="px-4 py-2 border-r-2 capitalize">
                    {JSON.stringify(!item.isActive)}
                  </td>
                  <td className="px-4 py-2 border-r-2">
                    <button
                      className="rounded-full border hover:bg-white hover:text-black text-white font-bold py-2 px-4 "
                      type="button"
                      onClick={() =>
                        handleSubmit(`userdisplay?id=${item.regNo}`)
                      }
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2 border-r-2">
                    <button
                      className="rounded-full border hover:bg-white hover:text-black text-white font-bold py-2 px-4  "
                      type="button"
                      onClick={() => handleBan(item.regNo, item.name)}
                    >
                      Roast
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="rounded-full border hover:bg-white hover:text-black text-white font-bold py-2 px-4  "
                      type="button"
                      onClick={() => handleUnBan(item.regNo)}
                    >
                      Unroast
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
