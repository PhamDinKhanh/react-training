import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { KYCData } from "../shared/types";
import { create } from "domain";

interface KYCDataState {
    user: KYCData | null;
    loading: boolean;
    error: string | null;
}

const initialState: KYCDataState = {
    user: null,
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
        const docRef = await addDoc(collection(db, "kycData"), data);
        return { ...data, id: docRef.id };
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
        }else {
            return thunkAPI.rejectWithValue('update KYC failed');
        }
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message);
    }
});