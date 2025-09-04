import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DoctorMainType, Transaction } from "../../data/generalTypes";
import axios from "axios";

interface FinancialState{
    loadingFinincial:boolean;
    transactions:Transaction[];
    errors:string | null;
};

const initialState : FinancialState = {
    loadingFinincial:false,
    transactions:[],
    errors:null
};

export const fetchTransactions = createAsyncThunk("transactions/fetch",async (_,thunkApi)=>{
    try{
        const res = await axios.get('http://127.0.0.1:8000/api/admin/finance',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            }
        })
        return res.data.data as Transaction[];
    }
    catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
    }
});


const finicialSlice = createSlice(
    {
        name:'doctors',
        initialState,
        reducers:{},
        extraReducers: (builder)=>{
            builder.addCase(fetchTransactions.pending,(state)=>{
                state.loadingFinincial = true;
                state.errors = null;
            })
            .addCase(fetchTransactions.fulfilled,(state , action : PayloadAction<Transaction[]>)=>{
                state.loadingFinincial = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected,(state,action)=>{
                state.loadingFinincial = false;
                state.errors = action.payload as string;
            })
        }
    }
)

export default finicialSlice.reducer
