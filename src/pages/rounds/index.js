import React from "react";
import RefreshToken from "@/utils/RefreshToken";
import axios from "axios";
import Router from "next/router";

export default function Rounds() {
  const handleSubmit = (value) => {
    Router.push(`/${value}`);
  };
  const enableRound = async (i) => {
    alert = `Round ${i} Enabled`;
    await RefreshToken();
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APIURL}admin/enableRound/${i}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(`Round ${i} Enabled`);
      //   alert(`Round ${i} Enabled`);
    } catch (error) {
      //   alert(`Round ${i} Enable Failed`);
      console.error("Error Enabling Round", error);
    }
  };

  const disableRound = async (i) => {
    await RefreshToken();
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APIURL}admin/disableRound/${i}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(`Round ${i} Disabled`);

      //   alert(`Round ${i} Disabled`);
    } catch (error) {
      //   alert(`Round ${i} Disable Failed`);
      console.error("Error Disabling Round", error);
    }
  };

  return (
    <>
      <button
        className="absolute top-20 left-8 uppercase border text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        type="button"
        onClick={() => handleSubmit("choice")}
      >
        Go Back
      </button>
      <div className="flex items-center justify-center content-center h-[100vh]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-row gap-7">
            <button
              className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
              type="submit"
              onClick={() => enableRound(0)}
            >
              Round 1 Enable
            </button>

            <button
              className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
              type="submit"
              onClick={() => disableRound(0)}
            >
              Round 1 Disable
            </button>
          </div>

          <div className="flex flex-row gap-7">
            <button
              className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
              type="submit"
              onClick={() => enableRound(1)}
            >
              Round 2 Enable
            </button>

            <button
              className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
              type="submit"
              onClick={() => disableRound(1)}
            >
              Round 2 Disable
            </button>
          </div>

          <div className="flex flex-row gap-7">
            <button
              className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
              type="submit"
              onClick={() => enableRound(2)}
            >
              Round 3 Enable
            </button>

            <button
              className="uppercase w-[300px] text-[#D9D9D9] font-semibold py-[16px] px-[26px] text-[22px] border-[3px] border-[#D9D9D9] rounded-full hover:bg-[#D9D9D9] hover:text-black mt-5"
              type="submit"
              onClick={() => disableRound(2)}
            >
              Round 3 Disable
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
