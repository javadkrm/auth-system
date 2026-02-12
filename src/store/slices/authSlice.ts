import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from '../../types/user';
import { LoginFormData } from "../../types/auth";

const savedUser = localStorage.getItem('currentUser')
const users: User[] = JSON.parse(localStorage.getItem('users') || '[]') || [];


interface AuthState {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
}


const initialState: AuthState = {
    currentUser: savedUser ? JSON.parse(savedUser) : null,
    loading: false,
    error: null
};

export const loginUser = createAsyncThunk<
    User,
    { email: string; password: string },
    { rejectValue: string }
>(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

            const foundUser = users.find(
                user => user.email === email && user.password === password
            );

            if (!foundUser) {
                return thunkAPI.rejectWithValue("Email or password is incorrect");
            }

            localStorage.setItem("currentUser", JSON.stringify(foundUser));

            return foundUser;

        } catch {
            return thunkAPI.rejectWithValue("Login failed");
        }
    }
);

export const registerUser = createAsyncThunk<
    User,
    { name: string; email: string; password: string },
    { rejectValue: string }

>(
    "auth/registerUser",
    async (userData, thunkAPI) => {
        try {
            const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

            if (users.some((user: User) => user.email === userData.email)) {
                return thunkAPI.rejectWithValue('Email already exists');
            }

            const newUser: User = {
                id: Date.now(),
                name: userData.name,
                email: userData.email,
                password: userData.password,
                role: 'user'
            }

            const updatedUsers = [...users, newUser]
            localStorage.setItem('users', JSON.stringify(updatedUsers))
            localStorage.setItem('currentUser', JSON.stringify(newUser))

            return newUser
        }
        catch {
            return thunkAPI.rejectWithValue('Registration failed')
        }
    }
)



const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        logout: (state) => {
            state.currentUser = null
            localStorage.removeItem('currentUser')
        }

    },

    extraReducers: (builder) => {
        builder

            .addCase(loginUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })

            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.currentUser = action.payload;
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true,
                    state.error = null
            })

            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.currentUser = action.payload;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            })
    }
})

export const { logout } = authReducer.actions
export default authReducer.reducer