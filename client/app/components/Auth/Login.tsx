import React, { FC, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "@/app/styles/style";

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
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: ({ email, password }) => {
      console.log(email, password);
    },
  });
  const { errors, values, touched, handleChange, handleSubmit } = formik;
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
            type="text"
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
              className="absolute right-3 top-12"
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-3 top-12"
              onClick={() => setShow(true)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>
        <div className={`${styles.button}`}>
          <input type="submit" value="Login" className="cursor-pointer" />
        </div>
      </form>
      <h5 className="text-center">Or Login With</h5>
      <div className="flex items-center justify-center my-4 gap-3">
        <AiFillGithub size={35} className="cursor-pointer" />
        <FcGoogle size={35} className="cursor-pointer" />
      </div>
      <h5 className="text-center font-Poppins font-[500]">
        Not have an account ?{" "}
        <span className="text-sky-500 cursor-pointer"
        onClick={()=>setRoute('sign-up')}>Sign Up</span>
      </h5>
    </div>
  );
};
export default Login;
