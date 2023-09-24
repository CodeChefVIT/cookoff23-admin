import React from "react";
import logo from "@/assets/logo.svg"
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div className="flex items-center content-center mt-[1rem]">
        <Image src={logo} className="h-[100px] pb-5 mb-5" alt="logo" />
        <div className="">
            
          </div>

        {/* <div className="flex max-w-min font-bold text-7xl uppercase">
          <div className="text-[#a89b85]">Cook&nbsp;</div>
          <div className="text-[#df402a]">Off&nbsp;</div>
          <div className="text-[#a89b85] ">8.0&nbsp;</div>
        </div> */}

      </div>
    </>
  );
}
