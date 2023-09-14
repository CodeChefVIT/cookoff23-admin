// Left Side of DIV through which we will add question description.

import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import {AiFillDelete} from "react-icons/ai";

export default function Qform() {
  const formik = useFormik({
    initialValues: {
      // Got From API
      name: "",
      objective: "",
      inputFormat: [""],
      outputFormat: [""],
      constraints: [""],
      round: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      try {
        axios
          .post(
            "https://api-cookoff-prod.codechefvit.com/ques/createQues",
            values
          )
          .then((response) => {
            console.log("Question Posted");
            console.log(response);
            router.push("/choice");
          });
      } catch {
        (error) => {
          console.log("Question Post failed: " + error);
        };
      }
    },
  });

  const [inpFor, setinpFor] = useState([]);
  inpFor[0] = "dummy";
  const handleInpClick = () => {
    const temp = [...inpFor, []];
    setinpFor(temp);
  };
  const handleInpOnChange = (onChangeValue, i) => {
    inputFormat[i] = onChangeValue.target.value;
  };

  const handleInpDelete = (i) => {
    const deletVal=[...inpFor]
    deletVal.splice(i)
    setinpFor(deletVal)
  }

  const [outFor, setoutFor] = useState([]);
  outFor[0] = "dummy";
  const handleOutClick = () => {
    const temp = [...outFor, []];
    setoutFor(temp);
  };

  const handleOutDelete = (i) => {
    const deletVal=[...outFor]
    deletVal.splice(i)
    setoutFor(deletVal)
  }

  return (
    <>
      <div className="flex bg-[#1F1F1F] w-[47vw] h-auto py-[10px] items-center justify-center content-center text-[22px] text-white mt-[30px] mb-0">
        Add Question
      </div>
      <div className="flex items-center justify-center content-center">
        <div className="p-[50px] overflow-y-auto overflow-x-hidden h-[70vh] bg-[#161616]">
          <form onSubmit={formik.handleSubmit}>
            {/* Row 1 */}
            <div className="w-[100%]">
              <div className="flex flex-row ">
                {/* Round Input */}
                <div>
                  <div className="text-[#FFFFFF] text-[22px]">Round</div>
                  <div className="mb-[40px]">
                    <input
                      className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                      id="round"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.round}
                    />
                    {formik.errors.round ? (
                      <div className="text-[#D9D9D999] mt-1 ml-2">
                        {formik.errors.round}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Question Number Input */}
                <div className="mx-[10px]">
                  <div className="text-[#FFFFFF] text-[22px]">
                    Question Number
                  </div>
                  <div className="mb-[40px]">
                    <input
                      className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                      id="qno"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.qno}
                    />
                    {formik.errors.qno ? (
                      <div className="text-[#D9D9D999] mt-1 ml-2">
                        {formik.errors.qno}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Question Name \/ */}
            <div>
              <div className="text-[#FFFFFF] text-[22px]">Question Name</div>
              <div className="mb-[40px]">
                <input
                  className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                  id="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name ? (
                  <div className="text-[#D9D9D999] mt-1 ml-2">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Objective */}
            <div>
              <div className="text-[#FFFFFF] text-[22px]">Objective</div>
              <div className="mb-[40px]">
                <input
                  className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                  id="objective"
                  onChange={formik.handleChange}
                  value={formik.values.objective}
                />
                {formik.errors.objective ? (
                  <div className="text-[#D9D9D999] mt-1 ml-2">
                    {formik.errors.objective}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Constraints */}
            <div>
              <div className="text-[#FFFFFF] text-[22px]">Constraints</div>
              <div className="mb-[40px]">
                <input
                  className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                  id="constraints"
                  onChange={formik.handleChange}
                  value={formik.values.constraints}
                />
                {formik.errors.constraints ? (
                  <div className="text-[#D9D9D999] mt-1 ml-2">
                    {formik.errors.constraints}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Input Format */}
            <div>
              <div className="text-[#FFFFFF] text-[22px] flex gap-2 mb-4">
                <div>Input Format</div>
                <button className="text-[30px]" onClick={() => handleInpClick()}>
                  <AiFillPlusSquare />
                </button>
              </div>

              {inpFor.map((data, i) => {
                return (
                  <div className="mx-[10px] flex flex-row content-center" key={i}>
                    <div className="text-[#FFFFFF] text-[22px] mt-[20px]">
                      Input {i + 1}{" "}
                    </div>
                    <div className="mb-[40px]">
                      <input
                        className="w-[280px] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                        id="inputFormat"
                        type="text"
                        onChange={handleInpOnChange}
                        value={formik.values.inputFormat}
                      />
                      {formik.errors.inputFormat ? (
                        <div className="text-[#D9D9D999] mt-1 ml-2">
                          {formik.errors.inputFormat}
                        </div>
                      ) : null}
                    </div>
                    <button onClick={()=> handleInpDelete(i)}><div className="text-white flex content-center items-center mb-[40px]"><AiFillDelete className="text-[30px]"/></div></button>
                    
                  </div>
                );
              })}
            </div>

            {/* Output Format */}
            <div>
              <div className="text-[#FFFFFF] text-[22px] flex gap-2 mb-4">
                <div>Output Format</div>
                <button className="text-[30px]" onClick={() => handleOutClick()}>
                  <AiFillPlusSquare />
                </button>
              </div>

              {outFor.map((data, i) => {
                return (
                  <div className="mx-[10px] flex flex-row content-center" key={i}>
                    <div className="text-[#FFFFFF] text-[22px] mt-[20px]">
                      Output {i + 1}{" "}
                    </div>
                    <div className="mb-[40px]">
                      <input
                        className="w-[280px] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                        id="outputFormat"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.outputFormat}
                      />
                      {formik.errors.outputFormat ? (
                        <div className="text-[#D9D9D999] mt-1 ml-2">
                          {formik.errors.outputFormat}
                        </div>
                      ) : null}
                    </div>
                    <button onClick={() => handleOutDelete(i)}><div className="text-white flex content-center items-center mb-[40px]"><AiFillDelete className="text-[30px]"/></div></button>
                    
                  </div>
                );
              })}
            </div>

            

            {/* Save Changes */}
            <div className="flex items-center justify-center">
              <button
                className=" text-[#D9D9D9] font-semibold py-[8px] px-[26px] text-[22px] border-[2px] border-[#EB5939] bg-[#EB5939] rounded-[6px] hover:bg-[#D9D9D9] hover:text-black mt-3"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
