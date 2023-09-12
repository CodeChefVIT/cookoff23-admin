// Right Side of DIV through which we will add Testcases.

import React from "react";
import { useState } from "react";
import { useFormik } from "formik";

export default function Tform() {
  const formik = useFormik({
    initialValues: {
      expectedOutput: "",
      input: "",
      number: 0,
      hidden: true,
      time: 0,
      memory: 0,
      explanation: "",
      question: "",
    },

    onSubmit: (values) => {
      console.log(values);
      try {
        axios
          .post(
            "https://api-cookoff-prod.codechefvit.com/testcases/create/",
            values
          )
          .then((response) => {
            console.log("Testcase Posted");
            console.log(response);
            // router.push("/choice  ");
          });
      } catch {
        (error) => {
          console.log("Testcase Post failed: " + error);
        };
      }
    },
  });

  const [test, setTest] = useState([]);

  const handleClick = () => {
    const temp = [...test, []];
    setTest(temp);
  };

  return (
    <>
      <div className="flex bg-[#1F1F1F] w-[47vw] h-auto py-[10px] items-center justify-center content-center text-[22px] text-white mt-[30px] mb-0 ">
        Add Testcase
      </div>
      <div className="p-[25px] overflow-y-auto overflow-x-hidden h-[70vh] bg-[#161616]">
        <div className="">
          {/* Add Button */}
          <div>
            <button
              className="text-[#D9D9D9] font-semibold py-[2px] px-[26px] text-[22px] border-[2px] border-[#EB5939] bg-[#45973f] rounded-[6px] hover:bg-[#D9D9D9] hover:text-black my-3"
              onClick={() => handleClick()}
            >
              Add
            </button>
          </div>

          {test.map((data, i) => {
            return (
              <div key={i}>
                <form>
                  <div className="flex bg-[#1F1F1F] w-full px-5 h-auto py-[10px] items-center justify-center content-center text-[22px] text-white mt-[30px] mb-0 ">
                    Test Case {i + 1}
                  </div>
                  <div key={i} className="bg-[#0d0d0d] p-5">
                    {/* Expected Output */}
                    <div>
                      <div className="text-[#FFFFFF] text-[22px]">
                        Expected Output
                      </div>
                      <input
                        className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                        id="name"
                        onChange={formik.handleChange}
                        value={formik.values.expectedOutput[{ i }]}
                      />
                    </div>

                    {/* Input */}
                    <div>
                      <div className="text-[#FFFFFF] text-[22px]">Input</div>
                      <textarea
                        className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                        id="name"
                        onChange={formik.handleChange}
                        value={formik.values.input[{ i }]}
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
                        {/* Number */}
                        <div>
                          <div className="text-[#FFFFFF] text-[22px]">
                            Number
                          </div>
                          <div className="mb-[40px]">
                            <input
                              className="w-full py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                              id="number"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.number[{ i }]}
                            />
                            {formik.errors.number ? (
                              <div className="text-[#D9D9D999] mt-1 ml-2">
                                {formik.errors.number}
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
                              id="hidden"
                              type="text"
                              onChange={formik.handleChange}
                              value={formik.values.hidden[{ i }]}
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
                          <div className="text-[#FFFFFF] text-[22px]">Time</div>
                          <div className="mb-[40px]">
                            <input
                              className="w-[47%px] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold"
                              id="time"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.time[{ i }]}
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
                              id="memory"
                              type="number"
                              onChange={formik.handleChange}
                              value={formik.values.memory[{ i }]}
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
                    <div>
                      <div className="text-[#FFFFFF] text-[22px]">
                        Explanation
                      </div>
                      <textarea
                        className="w-[97%] py-[12px] px-[12px] m-[10px] text-[#D9D9D999] bg-[#2C2C2C] text-[22px] font-semibold break-words overflow-auto resize-none"
                        id="name"
                        onChange={formik.handleChange}
                        value={formik.values.explanation[{ i }]}
                        rows={4}
                      />
                      {formik.errors.explanation ? (
                        <div className="text-[#D9D9D999] mt-1 ml-2">
                          {formik.errors.explanation}
                        </div>
                      ) : null}
                    </div>
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
            );
          }
          )}
        </div>
      </div>
    </>
  );
}
