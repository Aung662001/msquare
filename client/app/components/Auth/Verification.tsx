import { styles } from "@/app/styles/style";
import React, { FC, useState, useRef,useEffect } from "react";
import { Toast } from "react-hot-toast";
import {VscWorkspaceTrusted} from "react-icons/vsc"

type Props = {
  setRoute: (route: string) => void;
};
type VerificationNumbers = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [InvalidNumbers, setInvalidNumbers] = useState(false);
  const inputRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verificationNumbers, setVerificationNumbers] =
    useState<VerificationNumbers>({
      "0": "",
      "1": "",
      "2": "",
      "3": "",
    });
  const verificationHandler = () => {};
  const handleInputChange = (index: number, value: string) => {
    setInvalidNumbers(false);
    const newVerificationNumbers = { ...verificationNumbers, [index]: value };
    setVerificationNumbers(newVerificationNumbers);

    if (value === "" && index > 0) {
      inputRef[index - 1].current?.focus();
    } else if (value.length == 1 && index < 3) {
      console.log(inputRef[index + 1]);
      inputRef[index + 1].current?.focus();
    }
  };
  useEffect(()=>{
     inputRef[0].current?.focus();
  },[])
  return (
    <div className="w-full">
      <h1 className={styles.title}>Verify Your Email</h1>
      <form onSubmit={verificationHandler}>
        <div className="mb-6">
            <VscWorkspaceTrusted size={50} className="bg-sky-500  rounded-full p-2 m-auto"/>
        </div>
        <div className="flex justify-around mb-4">
          {Object.keys(inputRef).map((key, index) => (
            <input
              type="text"
              className="w-[60px] h-[60px] rounded-lg outline-none text-center dark:bg-gray-950 bg-slate-300 text-black dark:text-white"
              onChange={(e) => handleInputChange(index, e.target.value)}
              ref={inputRef[index]}
            />
          ))}
        </div>
        <input type="submit" value={"Verify OPT"} className={styles.button} />
      </form>
      <h5 className="text-center font-Poppins font-[500] text-black dark:text-white">
        Go Back to {" "}
        <span
          className="text-sky-500 cursor-pointer"
          onClick={() => setRoute("sign-up")}
        >
          Sign In
        </span>
      </h5>
    </div>
  );
};
export default Verification;
