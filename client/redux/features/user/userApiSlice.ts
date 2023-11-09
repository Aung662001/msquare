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
        })
    })
})
export const {useUpdateProfileImageMutation} = userApi;