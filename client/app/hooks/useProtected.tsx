import React,{FC} from 'react'
import { useSelector } from 'react-redux'
import {redirect} from "next/navigation"

type Props = {
    children:React.ReactNode
}

const useProtected:FC<Props> = ({children}) => {
    const {user} = useSelector((state:any)=>(state.auth))
  return user? children:redirect("/");
}

export default useProtected