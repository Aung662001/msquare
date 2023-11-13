import React,{FC} from 'react'
import {redirect} from "next/navigation"
import userAuth from './userAuth'

type Props = {
    children:React.ReactNode
}

const useProtected:FC<Props> = ({children}) => {
  const isAuthenticated = userAuth();
  return isAuthenticated ? children :redirect("/");
}

export default useProtected