import { error } from "console";
// import fetch_dashboard_data from "./dashboardThunk";
import { create } from "domain";
import { createSlice } from "@reduxjs/toolkit";
import { fetch_budget_data } from "./budgetThunk";
// import { fetch_expense_data,fetch_category_data } from "./expenseThunk";
// import { fetch_dashboard_data } from "./dashboardThunk";



const getBudgetData = async (builder) => {
    builder
        .addCase(fetch_budget_data.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetch_budget_data.fulfilled, (state, action) => {

            console.log("action.payload", action.payload);

            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetch_budget_data.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;  // Correct way
        });
}



const budgetSlice = createSlice({
    name: "expenses",
    initialState: {
        data: [],
        catagory_list: [],
        loading: false,
        error: null
    },
    reducers: {
        setBudget: (state, action) => {
            state.data = action.payload;
        },
        resetBudget: (state) => {
            state.data = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        getBudgetData(builder);
    },
})

export const { setBudget, resetBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
