import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { KYCData } from "../shared/types";

interface KYCDataState {
    kycData: KYCData | null;
    loading: boolean;
    error: string | null;
}

const initialState: KYCDataState = {
    kycData: null,
    loading: false,
    error: null,
};

export const getKYCDataById = createAsyncThunk<KYCData, string>(
    "kycData/fetchById",
    async (id, thunkAPI) => {
        try {
            const docRef = doc(db, "kycData", id);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const data = snapshot.data();
                return {
                    id: data.id,
                    idType: data.idType,
                    idNumber: data.idNumber,
                    idFront: null,
                    idBack: null,
                    selfie: null,
                    expiryDate: data.expiryDate,
                }
            } else {
                return thunkAPI.rejectWithValue("KYC not found");
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Add user
export const addKYC = createAsyncThunk("kycData/addKYC", async (data: KYCData, thunkAPI) => {
    try {
        const docRef = doc(db, "kycData", data.id);
        await setDoc(docRef, data);
        const updatedSnapshot = await getDoc(docRef);
        if (updatedSnapshot.exists()) {
            const updatedData = updatedSnapshot.data();

            return {
                id: updatedData.id,
                ...updatedData,
            } as KYCData;
        }else {
            return thunkAPI.rejectWithValue('add KYC failed');
        }
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

// Add user
export const updateKYC = createAsyncThunk<KYCData, KYCData>("kycData/updateKYC", async (data, thunkAPI) => {
    try {
        if (!data.id) throw new Error("User ID is required");
        const KYCRef = doc(db, "kycData", data.id);
        const { id, ...updateData } = data;
        await updateDoc(KYCRef, updateData)
        const updatedSnapshot = await getDoc(KYCRef);
        if (updatedSnapshot.exists()) {
            const updatedData = updatedSnapshot.data();
            return updatedData as KYCData;
        } else {
            return thunkAPI.rejectWithValue('update KYC failed');
        }
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

const kycSlice = createSlice({
    name: "kyc",
    initialState,
    reducers: {
        clearKYC(state) {
            state.kycData = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // getKYCById
            .addCase(getKYCDataById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getKYCDataById.fulfilled, (state, action) => {
                state.loading = false;
                state.kycData = action.payload;
            })
            .addCase(getKYCDataById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            //addKYC
            .addCase(addKYC.fulfilled, (state, action) => {
                state.kycData = action.payload;
            })
            //updateKYC
            .addCase(updateKYC.fulfilled, (state, action) => {
                state.kycData = action.payload;
            })
    }
})

export default kycSlice.reducer;