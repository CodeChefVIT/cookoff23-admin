"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import UserDis from "../../components/userdis";

const App = () => {
  // const searchParams = useSearchParams();
  // const id = searchParams.get("id");
  const id = "22BCI0013"
  return (
    <>
      <UserDis id = {id}/>
    </>
  );
};

export default App;
