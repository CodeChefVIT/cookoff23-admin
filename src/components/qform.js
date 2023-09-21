// Left Side of DIV through which we will add question description.

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import RefreshToken from "@/utils/RefreshToken";
import Router from "next/router";

export default function Qform() {
  const formik = useFormik({
    initialValues: {
      // Got From API
      name: "",
      objective: "",
      inputFormat: [""],
      outputFormat: [""],
      sampleTestInput: [""],
      sampleTestOutput: [""],
      constraints: [""],
      round: 1,
      points: 0,
      // explanation:"",
    },

    onSubmit: async (values) => {
      await RefreshToken();
      try {
        const access_token = localStorage.getItem("access_token");
        values.sampleTestInput = inpFor;
        values.sampleTestOutput = outFor;
        values.constraints = constFor;
        console.log(values);

        axios
          .post(`${process.env.NEXT_PUBLIC_APIURL}ques/createQues`, values, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((response) => {
            alert("Posted!");
            console.log("Question Posted");
            console.log(response.data._id);
            // localStorage.setItem("question_id", response.data._id);
            Router.push("/questiondash");
          });
      } catch {
        (error) => {
          console.log("Question Post failed: " + error.response.data);
        };
      }
    },
  });

  //Input Format
  const [inpFor, setInpFor] = useState([""]);
  const handleInpClick = () => {
    const temp = [...inpFor, []];
    setInpFor(temp);
  };

  const handleInpOnChange = (onChangeValue, i) => {
    formik.handleChange;
    const inputFormat = [...inpFor];
    inputFormat[i] = onChangeValue.target.value;
    setInpFor(inputFormat);
  };

  const handleInpDelete = (i) => {
    const deleteVal = [...inpFor];
    deleteVal.splice(i, 1);
    setInpFor(deleteVal);
  };

  //Output Format
  const [outFor, setOutFor] = useState([""]);
  const handleOutClick = () => {
    const temp = [...outFor, []];
    setOutFor(temp);
  };

  const handleOutOnChange = (onChangeValue, i) => {
    formik.handleChange;
    const outputFormat = [...outFor];
    outputFormat[i] = onChangeValue.target.value;
    setOutFor(outputFormat);
  };

  const handleOutDelete = (i) => {
    const deleteVal = [...outFor];
    deleteVal.splice(i, 1);
    setOutFor(deleteVal);
  };

  // Constraints:
  const [constFor, setConstFor] = useState([""]);
  const handleConstClick = () => {
    const temp = [...constFor, []];
    setConstFor(temp);
  };

  const handleConstOnChange = (onChangeValue, i) => {
    formik.handleChange;
    const constraints = [...constFor];
    constraints[i] = onChangeValue.target.value;
    setConstFor(constraints);
  };

  const handleConstDelete = (i) => {
    const deleteVal = [...constFor];
    deleteVal.splice(i, 1);
    setConstFor(deleteVal);
  };

  const setFormikArrays = () => {
    console.log("Input: ", inpFor);
    console.log("Output: ", outFor);
    console.log("Constraints: ", constFor);
  };

  return (
    <>
      <div className="flex bg-[#1F1F1F] h-auto py-[10px] items-center justify-center content-center text-[22px] text-white mt-[30px] mb-0">
        Add Question
      </div>

      <div className="flex items-center justify-center content-center">
        <div className="p-[50px] overflow-y-auto overflow-x-hidden h-[70vh] w-full bg-[#161616]">
          <form onSubmit={formik.handleSubmit}>
            {/* Row 1 */}
            <div className="w-[100%]">
              <div className="flex justify-between ">
                {/* Round Input */}
                <div>
                  <div className="text-[#FFFFFF] text-[22px]">Round</div>
                  <div className="mb-[40px]">
                    <input
                      className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto"
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

                {/* Points Input */}
                <div className="mr-[10px] ">
                  <div className="text-[#FFFFFF] text-[22px]">Points</div>
                  <div className="mb-[40px]">
                    <input
                      className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                      id="points"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.points}
                    />
                    {formik.errors.points ? (
                      <div className="text-[#D9D9D999] mt-1 ml-2">
                        {formik.errors.points}
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
              <div className="text-[#FFFFFF] text-[22px] flex gap-2 mb-4">
                <div>Constraints</div>
                <button
                  type="button"
                  className="text-[30px]"
                  onClick={() => handleConstClick()}
                >
                  <AiFillPlusSquare />
                </button>
              </div>

              {constFor.map((data, i) => {
                return (
                  <div
                    className="mx-[10px] flex flex-row content-center"
                    key={i}
                  >
                    <div className="text-[#FFFFFF] text-[22px] mt-[20px]">
                      Constraint {i + 1}{" "}
                    </div>
                    <div className="mb-[40px]">
                      <input
                        className="w-[280px] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                        type="text"
                        onChange={(e) => handleConstOnChange(e, i)}
                      />
                      {formik.errors.constraints ? (
                        <div className="text-[#D9D9D999] mt-1 ml-2">
                          {formik.errors.constraints}
                        </div>
                      ) : null}
                    </div>
                    <button onClick={() => handleConstDelete(i)} type="button">
                      <div className="text-white flex content-center items-center mb-[40px]">
                        <AiFillDelete className="text-[30px]" />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div>
              <div className="text-[#FFFFFF] text-[22px]">Explanation</div>
              <div className="mb-[40px]">
                <input
                  className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                  id="explanation"
                  onChange={formik.handleChange}
                  value={formik.values.explanation}
                />
                {formik.errors.explanation ? (
                  <div className="text-[#D9D9D999] mt-1 ml-2">
                    {formik.errors.explanation}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Input Format */}
            <div>
              <div className="text-[#FFFFFF] text-[22px]">Input Format</div>
              <div className="mb-[40px]">
                <input
                  className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                  id="inputFormat[0]"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.inputFormat}
                />
                {formik.errors.inputFormat ? (
                  <div className="text-[#D9D9D999] mt-1 ml-2">
                    {formik.errors.inputFormat}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Output Format */}
            <div>
              <div className="text-[#FFFFFF] text-[22px]">Output Format</div>
              <div className="mb-[40px]">
                <input
                  className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                  id="outputFormat[0]"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.outputFormat[0]}
                />
                {formik.errors.outputFormat ? (
                  <div className="text-[#D9D9D999] mt-1 ml-2">
                    {formik.errors.outputFormat[0]}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Sample Test Input */}
            <div>
              <div className="text-[#FFFFFF] text-[22px] flex gap-2 mb-4">
                <div>Sample Test Input</div>
                <button
                  type="button"
                  className="text-[30px]"
                  onClick={() => handleInpClick()}
                >
                  <AiFillPlusSquare />
                </button>
              </div>

              {inpFor.map((data, i) => {
                return (
                  <div
                    className="mx-[10px] flex flex-row content-center"
                    key={i}
                  >
                    <div className="text-[#FFFFFF] text-[22px] mt-[20px]">
                      Input {i + 1}{" "}
                    </div>
                    <div className="mb-[40px]">
                      <input
                        className="w-[280px] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                        type="text"
                        onChange={(e) => handleInpOnChange(e, i)}
                      />
                      {formik.errors.inputFormat ? (
                        <div className="text-[#D9D9D999] mt-1 ml-2">
                          {formik.errors.inputFormat}
                        </div>
                      ) : null}
                    </div>
                    <button onClick={() => handleInpDelete(i)} type="button">
                      <div className="text-white flex content-center items-center mb-[40px]">
                        <AiFillDelete className="text-[30px]" />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Sample Test Output */}
            <div>
              <div className="text-[#FFFFFF] text-[22px] flex gap-2 mb-4">
                <div>Sample Test Output</div>
                <button
                  type="button"
                  className="text-[30px]"
                  onClick={() => handleOutClick()}
                >
                  <AiFillPlusSquare />
                </button>
              </div>

              {outFor.map((data, i) => {
                return (
                  <div
                    className="mx-[10px] flex flex-row content-center"
                    key={i}
                  >
                    <div className="text-[#FFFFFF] text-[22px] mt-[20px]">
                      Output {i + 1}{" "}
                    </div>
                    <div className="mb-[40px]">
                      <input
                        className="w-[280px] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                        type="text"
                        onChange={(e) => handleOutOnChange(e, i)}
                      />
                      {formik.errors.outputFormat ? (
                        <div className="text-[#D9D9D999] mt-1 ml-2">
                          {formik.errors.outputFormat}
                        </div>
                      ) : null}
                    </div>
                    <button onClick={() => handleOutDelete(i)} type="button">
                      <div className="text-white flex content-center items-center mb-[40px]">
                        <AiFillDelete className="text-[30px]" />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Save Changes */}
            <div className="flex items-center justify-center">
              <button
                className=" text-[#D9D9D9] font-semibold py-[8px] px-[26px] text-[22px] border-[2px] border-[#EB5939] bg-[#EB5939] rounded-[6px] hover:bg-[#D9D9D9] hover:text-black mt-3"
                type="submit"
                onClick={() => setFormikArrays()}
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
