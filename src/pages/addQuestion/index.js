import React from "react";
import Navbar from "@/pages/navbar";
import Qform from "../../components/qform";
import Router from "next/router";

export default function Addscreen() {
  return (
    <main className="">
      <button
        className="absolute top-[50px] left-8 uppercase border text-white py-2 px-4 rounded-full hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        type="button"
        onClick={() => Router.push(`/questiondash`)}
      >
        Go Back
      </button>
      <Navbar />
      <Qform />
    </main>
  );
}
