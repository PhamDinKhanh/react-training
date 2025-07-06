import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { User } from "../shared/types";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// 🔹 Add user
export const addUser = createAsyncThunk("user/addUser", async (user: User, thunkAPI) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    return { ...user, id: docRef.id };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});