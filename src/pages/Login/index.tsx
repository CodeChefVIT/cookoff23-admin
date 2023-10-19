import * as React from "react";
import Image from "next/image";
import Logo from "src/assets/images/logo.svg";
import { Formik, Field, Form, FormikHelpers } from "formik";
import axios from "axios";
import { Router, useRouter } from "next/router";

import { Toast } from "@/components/toast";
import ToastComponent from "@/components/toast";

interface Values {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();

  return (
    <div>
      <ToastComponent />
      <Image src={Logo} alt="Logo" width={600} className="mb-10"/>
      <div className="flex justify-center items-center align-middle content-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>,
          ) => {
            if (values.email === "" || values.password === "") {
              Toast("Please fill out all fields");
              setSubmitting(false);
              return;
            }

            axios
              .post("http://localhost:8080/auth/login", values)
              .then((response) => {
                console.log(response.data);
                setSubmitting(false);
                router.push("/home");
              })
              .catch((error) => {
                console.log(error);
                Toast("Incorrect Email or Password");
                setSubmitting(false);
              });
          }}
        >
          <Form className="w-[400px]">
            <Field
              id="email"
              name="email"
              placeholder="Email"
              className="w-full rounded-[25px] bg-[#1F1F1F] px-[33px] py-[18px] text-[22px] font-semibold text-[#D9D9D999] mt-4 mb-5"
            />

            <br />

            <Field
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              className="w-full rounded-[25px] bg-[#1F1F1F] px-[33px] py-[18px] text-[22px] font-semibold text-[#D9D9D999] mb-4"

            />

            <br />
            <div className="flex justify-center">
            <button
              type="submit"
              className="mt-5 rounded-full border-[3px] border-[#D9D9D9] px-[26px] py-[16px] text-[22px] font-semibold uppercase text-[#D9D9D9] hover:bg-[#D9D9D9] hover:text-black "
            >
              Let's Get Cooking
            </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
