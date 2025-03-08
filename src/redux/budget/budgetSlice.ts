import { error } from "console";
// import fetch_dashboard_data from "./dashboardThunk";
import { create } from "domain";
import { createSlice } from "@reduxjs/toolkit";
import { fetch_budget_data } from "./budgetThunk";
import { stat } from "fs";
// import { fetch_expense_data,fetch_category_data } from "./expenseThunk";
// import { fetch_dashboard_data } from "./dashboardThunk";



const getBudgetData = async (builder) => {
    builder
        .addCase(fetch_budget_data.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetch_budget_data.fulfilled, (state, action) => {

            state.loading = false;
            state.data = action.payload.data;
            state.budget_list = action.payload.budget_list;
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
        search : '' ,
        budget_list: [],
        catagory_list: [],
        loading: false,
        error: null
    },
    reducers: {
        addBudgetInLocal: (state, action) => {

            state.budget_list.unshift(action.payload);
        },
        setBudget: (state, action) => {
            state.data = action.payload;
        },
        resetBudget: (state) => {
            state.data = [];
            state.loading = false;
            state.search = '';
            state.error = null;
        },
        setbudgetSearch : (state ,action) =>{
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        getBudgetData(builder);
    },
})

export const { setBudget, resetBudget,setbudgetSearch, addBudgetInLocal } = budgetSlice.actions;
export default budgetSlice.reducer;
