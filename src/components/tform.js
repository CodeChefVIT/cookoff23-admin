// Right Side of DIV through which we will add Testcases.

import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import RefreshToken from "@/utils/RefreshToken";

export default function Tform({ id }) {
  const refresh = () => window.location.reload(true);

  const formik = useFormik({
    initialValues: {
      expectedOutput: "", // textarea
      input: "",
      group: 0,
      hidden: true,
      time: 0.0,
      memory: 0,
      // explanation: "",
      question: "",
    },

    onSubmit: async (values) => {
      await RefreshToken();
      try {
        const access_token = localStorage.getItem("access_token");
        // const qid = localStorage.getItem("question_id");
        const qid = id;
        console.log("Test = ", test);
        for (let i = 0; i < test.length; i++) {
          values.expectedOutput = test[i].expectedOutput;
          values.input = test[i].input;
          values.group = test[i].group;
          values.hidden = test[i].hidden;
          values.time = test[i].time;
          values.memory = test[i].memory;
          // values.explanation = test[i].explanation;
          values.question = qid;
          values.number = 0

          console.log("Values: ", values);

          axios
          .post(
            `${process.env.NEXT_PUBLIC_APIURL}testcases/create`,
            values,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then((response) => {
            console.log("Testcase " ,i ," Posted");
            refresh();
            // router.push("/choice");
          });
        }
        alert("Testcase Posted!");

      } catch {
        (error) => {
          console.log("Testcase Post failed: " + error.response.data);
          alert("Testcase posted failed!");

        };
      }
    },
  });

  const [test, setTest] = useState([
    {
      expectedOutput: "",
      input: "",
      group: 0,
      hidden: true,
      time: 0.0,
      memory: 0,
      // explanation: "",
      question: "",
    },
  ]);

  const handleClick = () => {
    setTest([
      ...test,
      {
        expectedOutput: "",
        input: "",
        group: 0,
        hidden: true,
        time: 0.0,
        memory: 0,
        // explanation: "",
        question: "",
      },
    ]);
  };

  const handleChange = (e, i) => {
    formik.handleChange;
    console.log(e.target.value);
    let { name, value } = e.target;
    const list = [...test];
    if (name === "group" || name === "memory" || name === "time") {
      value = parseFloat(value);
    } else if (name === "hidden") {
      value = value === "true";
    }
    list[i][name] = value;
    setTest(list);
    console.log(test);
  };

  const handleDelete = (i) => {
    const deleteVal = [...test];
    deleteVal.splice(i, 1);
    setTest(deleteVal);
    console.log(test);
  };

  return (
    <>
      <div className="flex bg-[#1F1F1F] w-[47vw] h-auto py-[10px] px-[25px] items-center justify-between content-center text-[22px] text-white mt-[30px] mb-0 ">
        <div className="">Add Testcase</div>
        {/* Add Button */}
        <button
          className="text-[30px] pr-[25px]"
          onClick={() => handleClick()}
          type="button"
        >
          <AiFillPlusSquare />
        </button>
      </div>
      <div className="p-[25px] overflow-y-auto overflow-x-hidden h-[70vh] bg-[#161616]">
        <div className="">
          <div>
            <form onSubmit={formik.handleSubmit}>
              {test.map((data, i) => {
                return (
                  <div key={i}>
                    <div className="flex bg-[#1F1F1F] w-full px-5 h-auto py-[10px] items-center content-center text-[22px] text-white mt-[30px] mb-0 justify-between">
                      <div className=" ">Test Case {i + 1}</div>
                      <button onClick={() => handleDelete(i)} type="button">
                        <div className="text-white text-[25px]">
                          <AiFillDelete />
                        </div>
                      </button>
                    </div>
                    <div key={i} className="bg-[#0d0d0d] p-5">
                      {/* Expected Output */}
                      <div>
                        <div className="text-[#FFFFFF] text-[22px]">
                          Expected Output
                        </div>
                        <textarea
                          className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                          name="expectedOutput"
                          onChange={(e) => handleChange(e, i)}
                          row={4}
                        />
                      </div>

                      {/* Input */}
                      <div>
                        <div className="text-[#FFFFFF] text-[22px]">Input</div>
                        <textarea
                          className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                          onChange={(e) => handleChange(e, i)}
                          name="input"
                          rows={2}
                        />
                        {formik.errors.input ? (
                          <div className="text-[#D9D9D999] mt-1 ml-2">
                            {formik.errors.input}
                          </div>
                        ) : null}
                      </div>

                      {/* Row 1 */}
                      <div>
                        <div className="flex flex-row">
                          {/* group */}
                          <div>
                            <div className="text-[#FFFFFF] text-[22px]">
                              Group
                            </div>
                            <div className="mb-[40px]">
                              <input
                                className="w-full py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                                type="number"
                                name="group"
                                onChange={(e) => handleChange(e, i)}
                              />
                              {formik.errors.group ? (
                                <div className="text-[#D9D9D999] mt-1 ml-2">
                                  {formik.errors.group}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          {/* Hidden */}
                          <div className="ml-[5vw]">
                            <div className="text-[#FFFFFF] text-[22px]">
                              Hidden
                            </div>
                            <div className="mb-[40px] w-[14vw]">
                              <select
                                className="w-full py-[15px] px-[20px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                                type="text"
                                name="hidden"
                                onChange={(e) => handleChange(e, i)}
                              >
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                              </select>
                              {formik.errors.hidden ? (
                                <div className="text-[#D9D9D999] mt-1 ml-2">
                                  {formik.errors.hidden}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div>
                        <div className="flex flex-row ">
                          {/* Time */}
                          <div>
                            <div className="text-[#FFFFFF] text-[22px]">
                              Time
                            </div>
                            <div className="mb-[40px]">
                              <input
                                className="w-[47%px] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                                name="time"
                                type="number"
                                step="0.01"
                                onChange={(e) => handleChange(e, i)}
                              />
                              {formik.errors.time ? (
                                <div className="text-[#D9D9D999] mt-1 ml-2">
                                  {formik.errors.time}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          {/* Memory */}
                          <div className="mx-[10px]">
                            <div className="text-[#FFFFFF] text-[22px]">
                              Memory
                            </div>
                            <div className="mb-[40px]">
                              <input
                                className="w-[99%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                                name="memory"
                                type="number"
                                defaultValue={2048}
                                onChange={(e) => handleChange(e, i)}
                              />
                              {formik.errors.memory ? (
                                <div className="text-[#D9D9D999] mt-1 ml-2">
                                  {formik.errors.memory}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Explanation */}
                      {/* <div>
                        <div className="text-[#FFFFFF] text-[22px]">
                          Explanation
                        </div>
                        <textarea
                          className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                          name="explanation"
                          onChange={(e) => handleChange(e, i)}
                          rows={4}
                        />
                        {formik.errors.explanation ? (
                          <div className="text-[#D9D9D999] mt-1 ml-2">
                            {formik.errors.explanation}
                          </div>
                        ) : null}
                      </div> */}
                    </div>
                  </div>
                );
              })}

              {/* Save Changes */}
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  <button
                    className=" text-[#D9D9D9] font-semibold py-[8px] px-[26px] text-[22px] border-[2px] border-[#EB5939] bg-[#EB5939] rounded-[6px] hover:bg-[#D9D9D9] hover:text-black mt-3"
                    type="submit"
                    onClick={() => {
                      // alert("Testcase Posted!")
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
