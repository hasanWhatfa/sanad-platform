import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DoctorMainType } from "../../data/generalTypes";
import axios from "axios";

interface DoctorsState{
    loadingDoctors:boolean;
    doctors:DoctorMainType[];
    errors:string | null;
};

const initialState : DoctorsState = {
    loadingDoctors:false,
    doctors:[],
    errors:null
};

export const fetchDoctors = createAsyncThunk("doctors/fetch",async (_,thunkApi)=>{
    try{
        const res = await axios.get('http://127.0.0.1:8000/api/admin/doctors',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            }
        })
        return res.data.data as DoctorMainType[];
    }
    catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
    }
});


const doctorsSlice = createSlice(
    {
        name:'doctors',
        initialState,
        reducers:{},
        extraReducers: (builder)=>{
            builder.addCase(fetchDoctors.pending,(state)=>{
                state.loadingDoctors = true;
                state.errors = null;
            })
            .addCase(fetchDoctors.fulfilled,(state , action : PayloadAction<DoctorMainType[]>)=>{
                state.loadingDoctors = false;
                state.doctors = action.payload;
            })
            .addCase(fetchDoctors.rejected,(state,action)=>{
                state.loadingDoctors = false;
                state.errors = action.payload as string;
            })
        }
    }
)

export default doctorsSlice.reducer
