import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

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
        })
    })
})
export const {useActivationMutation,useRegisterMutation}= authApi;