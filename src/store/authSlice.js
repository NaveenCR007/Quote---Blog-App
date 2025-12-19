// This is for authentication tracking

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {

        // 'state' -> Initial value
        // 'action' -> updated value sent as a params by other components, it is stored in 'payload' object.

        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            // action.payload === userData
        },

        logout: (state, action) => {
            state.status = false;
            state.userData = null;
        }
    }
})



// Export all the functions, so we can use them in the components
// Read 'Reducers in RTK part in Notes.md(Redux project)', if you want to know how 'autSlice.actions' has the access to all reducer methods.
export const {login, logout} = authSlice.actions;


// Export the entire reducers list, since it is default export, you can import it by any name
// Exporting the reducer and giving it to the store is what connects your logic to Redux.
export default authSlice.reducer;