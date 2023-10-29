import React, { FC, useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "@/app/styles/style";
import { CircularProgress } from "@mui/material";
import { useActivationMutation, useLoginMutation } from "@/redux/features/auth/authApiSlice";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  password: Yup.string().required("Please enter your password").min(6),
});

const Login: FC<Props> = ({setOpen,setRoute}) => {
  const [show, setShow] = useState(false);
  const [login,{isSuccess,isError,error,data,isLoading}] = useLoginMutation();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: ({ email, password }) => {
      login({email,password})
    },
  });
  const { errors, values, touched, handleChange, handleSubmit } = formik;

  useEffect(()=>{
    if(isSuccess){
      toast.success("Login success.")
      setOpen(false)
    }
    if (error) {
      if ("data" in error) {
        const message = (error.data as any).message;
        toast.error(message || "Something Wrong!");
      }
    }
  },[error,isSuccess])
  return (
    <div className="w-full">
      <h1 className={styles.title}>Login To Msquare Community</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className={styles.inputHolder}>
          <label htmlFor="email" className={styles.label}>
            Enter your Email
          </label>
          <input
            type="text"
            className={`${styles.input} ${
              errors.email && "border-red-500"
            } text-black dark:text-white font-Poppins`}
            placeholder="example@gmail.com"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>
        <div className={`${styles.inputHolder} relative`}>
          <label htmlFor="password" className={styles.label}>
            Enter your password
          </label>
          <input
            type={show ? "password" : "text"}
            className={`${styles.input} ${
              errors.password && "border-red-500"
            } text-black dark:text-white font-Poppins`}
            placeholder="aoei456#$"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="off"
          />
          {show ? (
            <AiOutlineEye
              className="absolute right-3 top-[52px]"
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-3 top-[52px]"
              onClick={() => setShow(true)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        <button
          type="submit"
          onClick={()=>handleSubmit}
          className={`${styles.button} ${
            isLoading ? "!bg-slate-500" : ""
          } cursor-pointer z-[99999]`}
        >
          {isLoading ? (
            <CircularProgress size={23} color="secondary" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
      <h5 className="text-center  text-black dark:text-white">Or Login With</h5>
      <div className="flex items-center justify-center my-4 gap-3">
        <AiFillGithub size={35} className="cursor-pointer bg-black rounded-full " />
        <FcGoogle size={35} className="cursor-pointer" />
      </div>
      <h5 className="text-center font-Poppins font-[500]  text-black dark:text-white">
        Not have an account ?{" "}
        <span className="text-sky-500 cursor-pointer"
        onClick={()=>setRoute('sign-up')}>Sign Up</span>
      </h5>
    </div>
  );
};
export default Login;
