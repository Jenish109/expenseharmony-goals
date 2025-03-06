export const API = {
    LOGIN: 'login',
    REGISTER: 'register',
    DASHBOARD:'getDashboardData',
    EXPENSE : 'getExpenseList',
    CATAGORY_LIST : "getExpenseCatagories",
    ADD_EXPENSE : "addExpenseData",
    ADD_BUDGET :"addEditBudgetData",
    GET_BUDGET_DATA : "getBudgetList",
    ADD_MONTHLY_DATA:"addMonthlyData"
}

export const Configs = {
    BASE_URL: "http://localhost:3000/",
}


export const LocalKeys = {
    USER_DATA: 'login_user_data',
    MONTHLY_DATA_SET : "monthly_Data_added"
}

export const Routes = {
    DASHBOARD : "/dashboard"
}