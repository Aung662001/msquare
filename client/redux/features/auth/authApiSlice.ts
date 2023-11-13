import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

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
        }),
        socialAuth:builder.mutation<{token:string,user:any},any>({
            query:({email,name,avatar})=>({
                url:"social-auth",
                method:"POST",
                body:{
                    email,
                    name,
                    avatar
                },
                credentials:"include" as const,
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
        }),
        logout:builder.query({
            query:()=>({
                url:"logout",
                method:"GET",
                credentials:"include",
            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                try{
                 const result = await queryFulfilled;
                 dispatch(userLoggedOut())
             }catch(err:any){
                 console.log(err.message);
             }
            }
        }),
    })
})
export const {useActivationMutation,useRegisterMutation,useLoginMutation,useSocialAuthMutation,useLogoutQuery}= authApi;