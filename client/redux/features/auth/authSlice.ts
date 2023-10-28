import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token:"",
    user:"",
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userRegistration:(state,action)=>{
            state.token = action.payload.token;
        },
        userLoggedOut:(state)=>{
            state.token="";
            state.user = "";
        },
        userLoggedIn:(state,action)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
        }
    }
})
export default authSlice.reducer;
export const {userRegistration, userLoggedOut,userLoggedIn} = authSlice.actions;