import React from "react";

export default function Groupinfo() {
  return (
    <div>
      <div id="repeat">
        <p className="flex content-center justify-center mt-3 bg-[#161616]">
          Group 1
        </p>
        <div className="w-[48vw] bg-[#171717]">
          <div className="px-[25px] ">
            <div className="flex flex-row gap-2">
              <p className="text-[#a89b85]">Compilation Error: </p>
              <p className="capitalize">
                {JSON.stringify(items.compilation_error[0])}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-[#a89b85]">Runtime Error: </p>
              <p className="capitalize">
                {JSON.stringify(items.runtime_error[0])}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-[#a89b85]">Time Limit Exceeded: </p>
              <p className="capitalize">
                {JSON.stringify(items.time_limit_exceeded[0])}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
