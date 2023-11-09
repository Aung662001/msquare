import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        updateProfileImage:builder.mutation({
            query:(avatar)=>({
                url:"update-profile-picture",
                method:"PUT",
                body:{avatar},
                credentials:"include" as const
            })
        }),
        updateProfile:builder.mutation({
            query:(name)=>({
                url:"user/update",
                method:"PUT",
                body:{name},
                credentials:"include" as const
            })
        }),
        updatePassword:builder.mutation({
            query:({oldPassword,newPassword})=>({
                url:"update-user-password",
                method:"PUT",
                body:{oldPassword,newPassword},
                credentials:"include" as const,
            })
        })
    })
})
export const {useUpdateProfileImageMutation,useUpdateProfileMutation,useUpdatePasswordMutation} = userApi;