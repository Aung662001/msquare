import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_SERVER_URL
    }),
    endpoints:(builder)=>({
        refreshToken:builder.query({
            query:()=>({
                url:"refresh",
                method:"GET",
                credentials:"include"
            })
        }),
        loadUser:builder.query({
            query:()=>({
                url:"me",
                method:"GET",
                credentials:"include",
            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                try{
                 const result = await queryFulfilled;
                 dispatch(userLoggedIn({
                     token:result.data.token,
                     user:result.data.user
                 }))
             }catch(err:any){
                 console.log(err.message);
             }
            }
        })
    }),
})

export const {useRefreshTokenQuery,useLoadUserQuery} = apiSlice;