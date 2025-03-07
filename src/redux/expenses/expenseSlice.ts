import { error } from "console";
// import fetch_dashboard_data from "./dashboardThunk";
import { create } from "domain";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetch_expense_data,
  fetch_category_data,
  add_expense,
} from "./expenseThunk";
// import { fetch_dashboard_data } from "./dashboardThunk";

const getExpenseData = async (builder) => {
  builder
    .addCase(fetch_expense_data.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetch_expense_data.fulfilled, (state, action) => {
      state.loading = false;
      const { data, limit, total_pages } = action.payload;

      state.limit = limit;
      state.total_pages = total_pages;

      if (state.page === 1) {
        state.data = data;
      } else {
        state.data = [...state.data, ...data];
      }
    })
    .addCase(fetch_expense_data.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Correct way
    });
};

const getCatagoryData = async (builder) => {
  builder
    .addCase(fetch_category_data.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetch_category_data.fulfilled, (state, action) => {
      state.loading = false;
      state.catagory_list = action.payload;
    })
    .addCase(fetch_category_data.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Correct way
    });
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    page: 1,
    search: "",
    filter: "",
    data: [],
    catagory_list: [],
    total_pages: null,
    limit: 10,
    loading: false,
    error: null,
  },
  reducers: {
    // addExpenseIntoLocal: (state, action) => {
    //     state.data.push(action.payload);
    // }
    addExpenseIntoLocal: (state, action) => {
      state.data.unshift(action.payload);
    },
    setExpenses: (state, action) => {
      state.data = action.payload;
    },
    resetExpenses: (state) => {
      state.data = [];
      state.page = 1;
      state.loading = false;
      state.error = null;
    },
    setSearchQuery: (state, action) => {
      state.search = action.payload;
      state.page = 1; // Reset page when search changes
    },
    setFilterCatagoryId: (state, action) => {
      state.filter = action.payload;
      state.page = 1; // Reset page when filter changes
    },
    increasePage: (state) => {
      if (state.page < state.total_pages) {
        state.page += 1;
      }
    },
  },

  extraReducers: (builder) => {
    getExpenseData(builder);
    getCatagoryData(builder);
  },
});

export const {
  setExpenses,
  addExpenseIntoLocal,
  resetExpenses,
  setSearchQuery,
  setFilterCatagoryId,
  increasePage
} = expenseSlice.actions;
export default expenseSlice.reducer;
