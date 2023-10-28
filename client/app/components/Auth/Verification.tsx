import { styles } from "@/app/styles/style";
import { useActivationMutation } from "@/redux/features/auth/authApiSlice";
import React, { FC, useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import {useSelector} from "react-redux";

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
  const {token} = useSelector((state:any)=>state.auth)
  const [InvalidNumbers, setInvalidNumbers] = useState(false);
  const [activation,{isError,isSuccess,isLoading,error,data}]= useActivationMutation();
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
    //send opt to server
  const verificationHandler = async(e:any) => {
    e.preventDefault();
    const verificationNumber= Object.values(verificationNumbers).join("");
    if(verificationNumber.length !==4){
      setInvalidNumbers(true);
      return
    }
    await activation({activation_token:token,activation_code:verificationNumber})
  };
  const handleInputChange = (index: number, value: string) => {
    if(value.length > 1) return;//accepted only one digit
    setInvalidNumbers(false);
    const newVerificationNumbers = { ...verificationNumbers, [index]: value };
    setVerificationNumbers(newVerificationNumbers);

    if (value === "" && index > 0) {
      inputRef[index - 1].current?.focus();
    } else if (value.length == 1 && index < 3) {
      inputRef[index + 1].current?.focus();
    }
  };
  useEffect(() => {
    inputRef[0].current?.focus();
    if(isSuccess){
      toast.success("Activated successfully")
      setRoute('login')
    }else if(error){
      setInvalidNumbers(true)
      if("data" in error){
        const message = (error.data as any).message
        toast.error(message)
      }else{
        toast.error("Activation failed.")
      }
      //clear codes
      setVerificationNumbers({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
      })
    }
  }, [isSuccess,error]);
  return (
    <div className="w-full">
      <h1 className={styles.title}>Verify Your Email</h1>
      <form onSubmit={verificationHandler}>
        <div className="mb-6">
          <VscWorkspaceTrusted
            size={50}
            className="bg-sky-500  rounded-full p-2 m-auto"
          />
        </div>
        <div className="flex justify-around mb-4 ">
          {Object.keys(inputRef).map((key, index) => (
            <input
              type="number"
              className={`w-[60px] h-[60px] rounded-lg outline-none  border-2  text-center dark:bg-gray-950 bg-slate-300 text-black dark:text-white ${InvalidNumbers ? "shake border-red-500":"border-white"}`}
              onChange={(e) => handleInputChange(index, e.target.value)}
              value={verificationNumbers[key as keyof VerificationNumbers]}
              ref={inputRef[index]}
              max={9}
              min={0}
            />
          ))}
        </div>
        <input type="submit" value={"Verify OPT"} className={styles.button} />
      </form>
      <h5 className="text-center font-Poppins font-[500] text-black dark:text-white">
        Go Back to{" "}
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
