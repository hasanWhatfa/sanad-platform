import { createAsyncThunk, createSlice,type PayloadAction  } from "@reduxjs/toolkit";
import type { Pateint } from "../../data/generalTypes";
import axios from "axios";


interface PatientsState{
    loading:boolean;
    patients:Pateint[];
    error: string | null;
}

const initialState : PatientsState ={
    patients:[],
    loading:false,
    error:null,
}


export const fetchPateins = createAsyncThunk("patients/fetch",async (_,thunkApi)=>{
    try{
        const res = await axios.get('http://127.0.0.1:8000/api/doctor/patients',{
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            }
        })
        return res.data.data as Pateint[];
    }
    catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
    }
});

const patinetSlice = createSlice({
    name:'patients',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPateins.pending,(state)=>{
            state.loading = true;
            state.error = null;            
        })
        .addCase(fetchPateins.fulfilled, (state, action: PayloadAction<Pateint[]>) => {
            state.loading = false;
            state.patients = action.payload;
        })    
        .addCase(fetchPateins.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
      });
    }
})

export default patinetSlice.reducer;