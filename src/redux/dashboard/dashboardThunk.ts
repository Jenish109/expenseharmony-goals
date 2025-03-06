import helper from "@/helper/helper";
import { API } from "@/lib/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const fetch_dashboard_data = createAsyncThunk<any, any>(
    "dashboard/fetch_dashboard_data",
    async (tempData, thunkAPI) => {
        console.log("fetch_dashboard_data called with tempData:", tempData);

        const { rejectWithValue } = thunkAPI;

        try {
            const response = await helper.commonApiCall({
                apiUri: API.DASHBOARD,
                method: "GET",
                isAuthenticatedCall: true,
            });

            if (!response || response.error) {
                throw new Error(response?.error || "Failed to fetch dashboard data");
            }

            const { status, data, message } = response;

            if (status) {
                return data; // Successfully fetched data
            } else {
                toast.error(message || "Failed to fetch dashboard data");
                return rejectWithValue(message || "Error fetching dashboard data");
            }
        } catch (error: any) {
            console.error("Error in fetch_dashboard_data:", error);
            return rejectWithValue(error?.message || "Something went wrong");
        }
    }
);



export const add_Monthly_Earning_Budget = createAsyncThunk<any, any>(
    "dashboard/add_expense",
    async (tempData, thunkAPI) => {
        console.log("add expense called with tempData:", tempData);

        const { rejectWithValue } = thunkAPI;
        // {description: 'sdfsfsdfsf', amount: '324', category: 'food', date: '2025-03-04'}

        try {
            const response = await helper.commonApiCall({
                apiUri: API.ADD_MONTHLY_DATA,
                method: "POST",
                body: {
                    monthly_budget: tempData.monthly_budget,
                    monthly_income: tempData.monthly_income,    
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

            return response;
        } catch (error: any) {
            console.error("Error in add expense:", error);
            return rejectWithValue(error?.message || "Something went wrong");
        }
    }
);