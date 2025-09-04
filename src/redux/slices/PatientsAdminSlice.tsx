import { createAsyncThunk, createSlice,type PayloadAction  } from "@reduxjs/toolkit";
import type { Pateint } from "../../data/generalTypes";
import axios from "axios";


interface PatientsAdminState{
    loading:boolean;
    patients:Pateint[];
    error: string | null;
    doctorPatients : Pateint[];
    loadingDoc :boolean;
}

const initialState : PatientsAdminState ={
    patients:[],
    loading:false,
    error:null,
    doctorPatients:[],
    loadingDoc:false
}


export const fetchAllPateins = createAsyncThunk("patients/admin/fetch",async (_,thunkApi)=>{
    try{
        const res = await axios.get('http://127.0.0.1:8000/api/admin/patients/all',{
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            }
        })
        return res.data.data as Pateint[];
    }
    catch (err: any) {
    return thunkApi.rejectWithValue(err.response.message);
    }
});

export const fetchDoctorPatients = createAsyncThunk("patiends/admin/doctor",async (id : number , thunkApi)=>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/admin/doctors/${id}/patients`,{
        
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            }
        })
        return res.data.data as Pateint[];
    }
    catch(err : any){
    return thunkApi.rejectWithValue(err.response?.data?.message || err.message);
    }
})

const patientAdminSlice = createSlice({
    name:'adminPatients',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllPateins.pending,(state)=>{
            state.loading = true;
            state.error = null;            
        })
        .addCase(fetchAllPateins.fulfilled, (state, action: PayloadAction<Pateint[]>) => {
            state.loading = false;
            state.patients = action.payload;
        })    
        .addCase(fetchAllPateins.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
      })
      .addCase(fetchDoctorPatients.pending,(state)=>{
        state.loadingDoc = true;
        state.error = null;
      })
      .addCase(fetchDoctorPatients.fulfilled,(state,action : PayloadAction<Pateint[]>)=>{
        state.loadingDoc = false;
        state.doctorPatients = action.payload;
      })
      .addCase(fetchDoctorPatients.rejected, (state,action)=>{
        state.loadingDoc = false;
        state.error = action.payload as string;
      })
    }
})

export default patientAdminSlice.reducer;