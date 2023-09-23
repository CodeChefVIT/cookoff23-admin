"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import UserDis from "../../components/userdis";

const App = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (typeof id == "string") {
    console.log("Passed");
    return (
      <>
      <div className="h-[100vh] overflow-auto">
        <UserDis id={id} />
      </div>
      </>
    );
  } else {
    console.log("Not String");
  }
  
};

export default App;
