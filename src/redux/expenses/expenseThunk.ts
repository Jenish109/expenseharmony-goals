import helper from "@/helper/helper";
import { API } from "@/lib/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

const fetch_expense_data: any = createAsyncThunk<any, any>(
  "dashboard/fetch_expense_data",
  async (tempData, thunkAPI) => {
    const { page, search, filter } = tempData;
    const { rejectWithValue } = thunkAPI;

    console.log("page", page);
    console.log("filter", filter);
    console.log("search", search);

    try {
      const response = await helper.commonApiCall({
        apiUri: API.EXPENSE,
        method: "POST",
        body: { page: page, category_id: filter, search: search },
        isAuthenticatedCall: true,
      });

      if (!response || response.error) {
        throw new Error(response?.error || "Failed to fetch expenses data");
      }

      const { status, data, message } = response;

      console.log("response --- ", response);

      if (status) {
        return response;
      } else {
        toast.error(message);
      }

      return response;
    } catch (error: any) {
      console.error("Error in fetch_expense_data:", error);
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

const fetch_category_data: any = createAsyncThunk<any, any>(
  "dashboard/fetch_catagory_data",
  async (tempData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await helper.commonApiCall({
        apiUri: API.CATAGORY_LIST,
        method: "GET",
        isAuthenticatedCall: true,
      });

      if (!response || response.error) {
        throw new Error(response?.error || "Failed to fetch catagory data");
      }

      const { status, data, message } = response;

      if (status) {
        return data;
      } else {
        toast.error(message);
      }

      return response;
    } catch (error: any) {
      console.error("Error in fetch_catagory_data:", error);
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

const add_expense: any = createAsyncThunk<any, any>(
  "dashboard/add_expense",
  async (tempData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    // {description: 'sdfsfsdfsf', amount: '324', category: 'food', date: '2025-03-04'}

    try {
      const response = await helper.commonApiCall({
        apiUri: API.ADD_EXPENSE,
        method: "POST",
        body: {
          description: tempData.expense_name,
          category_id: tempData.category_data.category_id,
          date: tempData.date,
          expense_amount: tempData.amount,
        },
        isAuthenticatedCall: true,
      });

      if (!response || response.error) {
        throw new Error(response?.error || "Failed to fetch catagory data");
      }

      const { status, data, message } = response;

      if (status) {
        toast.success(message);
        // return data;
      } else {
        toast.error(message);
      }

      return tempData;
    } catch (error: any) {
      console.error("Error in add expense:", error);
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

export { fetch_expense_data, fetch_category_data, add_expense };
