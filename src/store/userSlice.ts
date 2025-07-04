import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { User } from "../shared/types";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}