import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DoctorMainType } from "../../data/generalTypes";
import axios from "axios";
import doctorsData from "../../data/doctorsData";

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

const mapLocalToApiFormat = (localDoctors: typeof doctorsData): DoctorMainType[] => {
    return localDoctors.map(doc => ({
        id: doc.id,
        first_name: doc.name.split(' ')[0],
        last_name: doc.name.split(' ').slice(1).join(' '),
        avatar: doc.image,
        specialization: doc.description,
        achievements: doc.achievements.join(',')
    }));
};

export const fetchDox = createAsyncThunk("doctors/public/fetch",async ()=>{
    try{
        const res = await axios.get('http://127.0.0.1:8000/api/doctors/all')
        return res.data.data as DoctorMainType[];
    }
    catch (err: any) {
        return mapLocalToApiFormat(doctorsData);
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
            .addCase(fetchDox.rejected,(state)=>{
                state.loadingDoctors = false;
                state.errors = null;
            })
        }
    }
)

export default pubDoctors.reducer
