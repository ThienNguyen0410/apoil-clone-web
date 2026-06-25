import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type UserEntities from '../../entities/user/entity';
import type { UserPayLoad } from '../../entities/user/entity';
import { authRepository } from '../../repositories/auth/auth';
import { REHYDRATE } from 'redux-persist';

interface AuthState {
    user: UserEntities | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
}


export const login = createAsyncThunk("auth/Login", async(payload: UserPayLoad) => {
    return await authRepository.login(payload);
})


const autSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    },

    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true; 
        })

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred';
        })

        builder.addCase(REHYDRATE, (state) => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                state.user = null;
                state.isAuthenticated = false;
            }
        })
    }
})

export const {logout} = autSlice.actions;
export default autSlice.reducer;

