import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

export default function userAuth(){
    const {user} = useSelector((state:any)=>state.auth);
    if(user){
        return true;
    }else{
        return false;
    }
}