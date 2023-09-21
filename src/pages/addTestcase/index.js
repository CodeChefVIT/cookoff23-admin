import React from "react";
import Navbar from "@/pages/navbar";
import Tform from "./tform";
import Texist from "./texist";
import codeEditor from "../components/codeEditor";

export default function Addscreen() {
  return (
    <main className="">
      <Navbar />

      <div className="flex flex-row">
        <div className="w-[47vw] ml-[2vw] mr-[1vw]">
          <Texist/>
        </div>

        <div className="w-[47vw] mr-[2vw] ml-[1vw]">
          <Tform/>
        </div>
      </div>
    </main>
  );
}
