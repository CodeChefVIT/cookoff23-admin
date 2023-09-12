import React from "react";
import Navbar from "@/pages/navbar";
import Qform from "./qform";
import Tform from "./tform";

export default function Addscreen() {
  return (
    <main className="">
      <Navbar />

      <div className="flex flex-row">
        <div className="w-[47vw] ml-[2vw] mr-[1vw]">
          <Qform />
        </div>

        <div className="w-[47vw] mr-[2vw] ml-[1vw]">
          <Tform />
        </div>
      </div>
    </main>
  );
}
