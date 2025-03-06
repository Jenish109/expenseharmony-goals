import { error } from "console";
// import fetch_dashboard_data from "./dashboardThunk";
import { create } from "domain";
import { createSlice } from "@reduxjs/toolkit";
import { fetch_dashboard_data } from "./dashboardThunk";



const getDashboardData = async (builder) => {
    builder
        .addCase(fetch_dashboard_data.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetch_dashboard_data.fulfilled, (state, action) => {

            console.log("action.payload", action.payload);

            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetch_dashboard_data.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;  // Correct way
        });        
}



const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        setDashboard: (state, action) => {
            state.data = action.payload;
        },
        resetDashboard: (state) => {
            state.data = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        getDashboardData(builder);
    },
})

export const { setDashboard, resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
