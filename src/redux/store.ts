import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboard/dashboardSlice';
import expenseReduer from './expenses/expenseSlice';
import budgetReducer from './budget/budgetSlice';
const store = configureStore({
    reducer:{
        dashboard : dashboardReducer,
        expenses : expenseReduer ,
        budget : budgetReducer
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;