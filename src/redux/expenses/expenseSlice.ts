import { error } from "console";
// import fetch_dashboard_data from "./dashboardThunk";
import { create } from "domain";
import { createSlice } from "@reduxjs/toolkit";
import { fetch_expense_data, fetch_category_data, add_expense } from "./expenseThunk";
// import { fetch_dashboard_data } from "./dashboardThunk";



const getExpenseData = async (builder) => {
    builder
        .addCase(fetch_expense_data.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetch_expense_data.fulfilled, (state, action) => {

            console.log("action.payload", action.payload);

            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetch_expense_data.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;  // Correct way
        });
}

const getCatagoryData = async (builder) => {
    builder
        .addCase(fetch_category_data.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetch_category_data.fulfilled, (state, action) => {

            console.log("action.payload", action.payload);

            state.loading = false;
            state.catagory_list = action.payload;
        })
        .addCase(fetch_category_data.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;  // Correct way
        });
}


const addExpenseData = async (builder) => {
    builder
        .addCase(add_expense.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(add_expense.fulfilled, (state, action) => {

            state.loading = false;
            state.data = action.payload;
        })
        .addCase(add_expense.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;  // Correct way
        });
}


const expenseSlice = createSlice({
    name: "expenses",
    initialState: {
        data: [],
        catagory_list: [],
        loading: false,
        error: null
    },
    reducers: {
        setExpenses: (state, action) => {
            state.data = action.payload;
        },
        resetExpenses: (state) => {
            state.data = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        getExpenseData(builder);
        getCatagoryData(builder);
        addExpenseData(builder);
    },
})

export const { setExpenses, resetExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
