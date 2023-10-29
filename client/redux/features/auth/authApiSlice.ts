import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration } from "./authSlice";

type RegistrationResponse = {
    token:string;
    message:string;
}
export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation<RegistrationResponse,any>({
            query:(data)=>({
                url:"register",
                method:"POST",
                body:data,
                credentials:"include"
            }),
           async onQueryStarted(arg,{dispatch,queryFulfilled}){
               try{
                const result = await queryFulfilled;
                dispatch(userRegistration({
                    token:result.data.token
                }))
            }catch(err:any){
                console.log(err.message);
            }
           }
        }),
        activation:builder.mutation({
            query:({activation_token,activation_code})=>({
                url:"validate",
                method:"POST",
                body:{
                    token:activation_token,
                    activationCode:activation_code
                }
            })
        }),
        login:builder.mutation<{token:string,user:any},any>({
            query:({email,password})=>({
                url:"login",
                method:"POST",
                body:{
                    email,
                    password
                },
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
    })
})
export const {useActivationMutation,useRegisterMutation,useLoginMutation}= authApi;