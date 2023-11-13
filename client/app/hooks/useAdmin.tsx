import {  useSelector } from "react-redux/es/hooks/useSelector";
import { redirect } from "next/navigation";

interface Props{
    children:React.ReactNode
}
const AdminProtected = ({children}:Props)=>{
    const {user } = useSelector((state:any)=>state.auth)
   if(user){
    const isAdmin = user.role === "admin" ? true : false;
    return isAdmin ? children : redirect("/");
   }
}
export default AdminProtected;