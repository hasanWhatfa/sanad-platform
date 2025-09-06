import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DoctorMainType, Transaction } from "../../data/generalTypes";
import axios from "axios";

interface DoctorsState{
    loadingDoctors:boolean;
    doctorsPub:DoctorMainType[];
    errors:string | null;
};

const initialState : DoctorsState = {
    loadingDoctors:false,
    doctorsPub:[],
    errors:null
};

export const fetchDox = createAsyncThunk("doctors/public/fetch",async (_,thunkApi)=>{
    try{
        const res = await axios.get('http://127.0.0.1:8000/admin/doctors')
        return res.data.data as DoctorMainType[];
    }
    catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
    }
});


const pubDoctors = createSlice(
    {
        name:'doctorsPub',
        initialState,
        reducers:{},
        extraReducers: (builder)=>{
            builder.addCase(fetchDox.pending,(state)=>{
                state.loadingDoctors = true;
                state.errors = null;
            })
            .addCase(fetchDox.fulfilled,(state , action : PayloadAction<DoctorMainType[]>)=>{
                state.loadingDoctors = false;
                state.doctorsPub = action.payload;
            })
            .addCase(fetchDox.rejected,(state,action)=>{
                state.loadingDoctors = false;
                state.errors = action.payload as string;
            })
        }
    }
)

export default pubDoctors.reducer
