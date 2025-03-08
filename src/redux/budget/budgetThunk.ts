import helper from "@/helper/helper";
import { API } from "@/lib/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

const fetch_budget_data:any = createAsyncThunk<any, any>(
    "dashboard/fetch_budget_data",
    async (tempData, thunkAPI) => {
        console.log("fetch_budget_data called with tempData:", tempData);

        const { rejectWithValue } = thunkAPI;
        const {search  =  ''} = tempData ;

        try {
            const response = await helper.commonApiCall({
                apiUri: API.GET_BUDGET_DATA,
                method: "POST",
                body : {search : search},
                isAuthenticatedCall: true,
            });

            if (!response || response.error) {
                throw new Error(response?.error || "Failed to fetch expenses data");
            }
            console.log('response ---- ' , response)
            const { status, data, message } = response;

            if (status) {
                return data;
            } else {
                toast.error(message);
            }

            return response;
        } catch (error: any) {
            console.error("Error in fetch_budget_data:", error);
            return rejectWithValue(error?.message || "Something went wrong");
        }
    }
);


const add_budget:any = createAsyncThunk<any, any>(
    "dashboard/add_budget",
    async (tempData, thunkAPI) => {
        console.log("add expense called with tempData:", tempData);

        const { rejectWithValue } = thunkAPI;
        // {description: 'sdfsfsdfsf', amount: '324', category: 'food', date: '2025-03-04'}

        try {
            const response = await helper.commonApiCall({
                apiUri: API.ADD_BUDGET,
                method: "POST",
                body: {
                    category_id: tempData.category_data.category_id,
                    budget_amount: tempData.amount,
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

export { fetch_budget_data, add_budget };