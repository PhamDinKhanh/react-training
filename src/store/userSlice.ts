import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { User } from "../shared/types";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Get user by ID
export const getUserById = createAsyncThunk<User, string>(
  "users/fetchById",
  async (id, thunkAPI) => {
    try {
      const docRef = doc(db, "users", id);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        return {
          id,
          avatar: data.avatar,
          name: data.name,
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          city: data.city,
          address: data.address,
          email: data.email,
          phoneNumber: data.phoneNumber,
          birthday: data.birthday,
          organization: data.organization,
          role: data.role,
          department: data.department,
          zipCode: data.zipCode,
          biography: data.biography,
          status: data.status as "Active" | "Inactive",
        };
      } else {
        return thunkAPI.rejectWithValue("User not found");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add user
export const addUser = createAsyncThunk("user/addUser", async (user: User, thunkAPI) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    return { ...user, id: docRef.id };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Update user
export const updateUser = createAsyncThunk<User, User>(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      if (!user.id) throw new Error("User ID is required");
      const userRef = doc(db, "users", user.id);
      const { id, ...updateData } = user;
      await updateDoc(userRef, updateData);
      const updatedSnapshot = await getDoc(userRef);
      if (updatedSnapshot.exists()) {
        const updatedData = updatedSnapshot.data();
        return updatedData as User
      } else {
        return thunkAPI.rejectWithValue("KYC not found");
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk<string, string>(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      const userRef = doc(db, "users", id);
      await deleteDoc(userRef);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Get user
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add
      .addCase(addUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // Update
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // Delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (state.user?.id === action.payload) {
          state.user = null;
        }
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;