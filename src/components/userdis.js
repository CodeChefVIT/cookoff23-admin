import React from "react";
import Router from "next/router";
import Navbar from "@/pages/navbar";
import { useState, useEffect } from "react";
import RefreshToken from "@/utils/RefreshToken";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import codeEditor from "./codeEditor";
import Widget from "./widget";

const Userdis = ({ id }) => {
  const reg = id;
  // console.log("Reg: ", typeof(id));
  const [data, setData] = useState([]);
  const [databr, setDatabr] = useState([]);
  const [codeData, setCodeData] = useState([]);
  const [round, setRound] = useState("");
  const [promote, setPromote] = useState("");

  const removeAllItems = () => {
    setCodeData([]);
  };

  const handleSubmit = (value) => {
    Router.push(`/${value}`);
  };

  const handleRoundChange = async (e, r) => {
    let roundValue = e.target.value;
    if (!confirm("Are you sure?")) {
      return;
    }
    setPromote(roundValue);

    switch (roundValue) {
      case "0":
        promoteUser(r, roundValue);
        break;

      case "1":
        promoteUser(r, roundValue);
        break;

      case "2":
        promoteUser(r, roundValue);
        break;
    }
  };

  const handleViewChange = async (e, r) => {
    let roundValue = e.target.value;
    setRound(roundValue);

    switch (roundValue) {
      case "0":
        try {
          removeAllItems();
          viewRound(r, roundValue);
          break;
        } catch (error) {}

      case "1":
        try {
          removeAllItems();
          viewRound(r, roundValue);
          break;
        } catch (error) {}

      case "2":
        try {
          removeAllItems();
          viewRound(r, roundValue);
          break;
        } catch (error) {}
    }
  };

  const viewRound = async (x, y) => {
    console.log(`Viewing Rounds ${y} of ${x}`);
    await RefreshToken();
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APIURL}submit/codes_by_round/${x}/${y}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const temp = response.data;
      console.log("Round Code: ", temp);
      setCodeData(temp);
      // fetchCodeData();
    } catch (error) {
      // console.error("Error viewRound: ", error);
    }
  };

  // useEffect(()=>{
  //   viewRound(data.regNo, 0)
  // })

  const promoteUser = async (x, y) => {
    console.log(`Promoted ${x} to ${y}`);
    await RefreshToken();
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}admin/promoteUser`,
        { regNo: x, round: y },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const temp = response.data;
      console.log(temp);
      alert("Round changed successfully!");
    } catch (error) {
      console.error("Error Promoting User:", error);
    }
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
      setPromote(temp.roundQualified);
      console.log(temp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCodeData = async () => {
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
    // fetchCodeData();
  }, []);
  return (
    <>
      {/* Bhai scroll nai hora 😭 update: ho gya bhai!!*/}
      <div className="overflow-auto">
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
            <div className="flex flex-row gap-10">
              <div className="flex flex-row items-center">
                <p className="">View Sub:</p>
                <select
                  className="w-[10vw] py-[15px] px-[20px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                  defaultValue="-"
                  type="text"
                  name="promote"
                  onChange={(e) => handleViewChange(e, data.regNo)}
                >
                  <option value="-">-</option>
                  <option value="0">Round 0</option>
                  <option value="1">Round 1</option>
                  <option value="2">Round 2</option>
                </select>
              </div>

              <div className="flex flex-row items-center">
                <p className="">Set Round:</p>
                <select
                  className="w-[10vw] py-[15px] px-[20px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                  // defaultValue="1"
                  defaultValue={data.roundQualified}
                  type="text"
                  name="round"
                  value={promote}
                  onChange={(e) => handleRoundChange(e, data.regNo)}
                >
                  <option value="0">Round 0</option>
                  <option value="1">Round 1</option>
                  <option value="2">Round 2</option>
                </select>
              </div>
              <div className="flex bg-[#124215] px-10 items-center my-[10px] rounded-[50px] text-[#4bff57]">
                <p className="capitalize">Round: {data.roundQualified}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#161616] flex flex-col gap-8 mt-0 p-5 px-[27px]">
            <div className="flex flex-row gap-10">
              <div className="flex gap-2 flex-col">
                <div className="flex flex-row gap-2">
                  <p className="text-[#a89b85]">ID: </p>
                  <p className="capitalize">{data._id}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <p className="text-[#a89b85]">Reg No: </p>
                  <p className="capitalize">{data.regNo}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-col">
                <div className="flex flex-row gap-2">
                  <p className="text-[#a89b85]">Email: </p>
                  <p className="">{data.email}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <p className="text-[#a89b85]">Score: </p>
                  <p className="capitalize">
                    {Math.floor(data.score * (1 / 3) * 10)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {codeData.length > 0 ? (
          codeData.map((items, i) => {
            return (
              <div
                className="flex flex-col text-white items-center justify-center content-center mt-[2vw] text-[20px]"
                key={i}
              >
                <div className="p-3 bg-[#1b1a1a] w-[97vw] flex items-center justify-center content-center">
                  {`Code ${i + 1}. ${items.name} (${items.question_id}) --
                ${items.points} points`}
                </div>
                <div className="flex flex-row items-top justify-center content-center gap-[1vw]">
                  <div className="w-[48vw] bg-[#161616]">
                    {codeEditor(items.code, items.language_id, `max`)}
                  </div>
                  <div className="flex flex-col">
                    
                    {items.compilation_error && (
                      <Widget error={items.compilation_error} i={1} />
                    )}
                    {items.runtime_error && (
                      <Widget error={items.runtime_error} i={2} />
                    )}
                    {items.time_limit_exceeded && (
                      <Widget error={items.time_limit_exceeded} i={3} />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-white flex items-center content-center justify-center h-[40vh]">
            No Codes Available
          </div>
        )}
      </div>
    </>
  );
};

export default Userdis;
