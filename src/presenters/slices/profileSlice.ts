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

export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (user: UserEntities) => {
        return await UserRepositories.changeProfile(user);
    }
)

export const changePassword = createAsyncThunk(
    'profile/changePassword',
    async ({oldPassword, newPassword}: {oldPassword: string, newPassword: string}) => {
        return await UserRepositories.changePassword(oldPassword, newPassword);
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

        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
            state.error = null;
        })

        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update profile';
        })

        builder.addCase(changePassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(changePassword.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        })

        builder.addCase(changePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to change password';
        })
    }
})

export default profileSlice.reducer;

