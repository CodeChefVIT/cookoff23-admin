"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import Navbar from "@/pages/navbar";
import Tform from "../../components/tform";
import Texist from "../../components/texist";
import Router from "next/router";

export default function Addscreen() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // console.log(id)
  return (
    <main className="">
      <button
        className="absolute top-8 left-8 uppercase border text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        type="button"
        onClick={() => Router.push(`/questiondash`)}
      >
        Go Back
      </button>
      <Navbar />

      <div className="flex flex-row">
        <div className="w-[47vw] ml-[2vw] mr-[1vw]">
          <Texist id={id} />
        </div>

        <div className="w-[47vw] mr-[2vw] ml-[1vw]">
          <Tform id={id} />
        </div>
      </div>
    </main>
  );
}
