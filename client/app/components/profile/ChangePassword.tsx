import React,{useState,useEffect} from "react";
import { styles } from "./ProfileInfo";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApiSlice";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
type Props = {};

const ChangePassword = (props: Props) => {
    const [show ,setShow] = useState(false)
    const [updatePassword,{error,isSuccess}] = useUpdatePasswordMutation();
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confgPassword,setConfgPassword] = useState("")
    const oldPasswordChange = (e:any) => setOldPassword(e.target.value);
    const newPasswordChange = (e:any) => setNewPassword(e.target.value);
    const confgPasswordChange = (e:any) => setConfgPassword(e.target.value);
    async  function updateUserPassword(){
            if(!oldPassword.length ||!newPassword.length || !confgPassword.length || newPassword !== confgPassword){
                return
            }
            updatePassword({oldPassword,newPassword})
        }
        useEffect(() => {
            if(isSuccess){
                toast.success("Password updated successfully");
            }
            if(error){
                toast.error("Error updating password");
                console.log(error)
            }
            let index = confgPassword.length-1;
            if(confgPassword.charAt(index) !== newPassword.charAt(index)){
                toast.error("New Passwords do not match");
            }
        }, [isSuccess,error,confgPassword]);
        
  return (
    <div className="h-[450px] ms-9  w-full  border-gray-300  rounded-sm  mt-[100px] mb-[80px] flex flex-col gap-5 border-0">
      <div className="flex-col flex gap-3">
        <label htmlFor="oldPassword" className={styles.label}>Enter Old Password</label>
        <input type="text" id="oldPassword" className={styles.input} onChange={(e)=>oldPasswordChange(e)}/>
      </div>
      <div className="flex-col flex gap-3">
        <label htmlFor="newPass" className={styles.label}>Enter New Password</label>
        <input type={show?"text":"password"} id="newPass" className={styles.input} onChange={e=>newPasswordChange(e)}/>
      </div>
      <div className="flex-col flex gap-3 relative">
        <label htmlFor="confPass" className={styles.label}>Confirm New Password</label>
        <input type={show?"text":"password"} id="confPass" className={styles.input} onChange={e=>confgPasswordChange(e)}/>
        {show ? (
            <AiOutlineEye
              className="absolute right-3 top-[68px]"
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-3 top-[68px]"
              onClick={() => setShow(true)}
            />
          )}
      </div>
      <button className={`${styles.button} w-[150px] mt-4`} onClick={updateUserPassword}>Update</button>
    </div>
  );
};
export default ChangePassword;
