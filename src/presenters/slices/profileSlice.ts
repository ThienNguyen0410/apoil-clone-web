import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type UserEntities from '../../entities/user/entity';
import {UserRepositories} from '../../repositories/user/user';


interface ProfileState {
    profile: UserEntities | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    profile: null,
    loading: false,
    error: null,
}

export const fetchMyProfile = createAsyncThunk(
    'profile/fetchMyProfile',
    async () => {
        return await UserRepositories.getCustomerProfile();
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{},

    extraReducers: (builder) => {
        builder.addCase(fetchMyProfile.pending, (state) => {
            state.loading = true
            state.error = null;
        })

        builder.addCase(fetchMyProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })

        builder.addCase(fetchMyProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch profile';
        })
    }
})

export default profileSlice.reducer;

