import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type UserEntities from '../../entities/user/entity';
import {UserRepositories} from '../../repositories/user/user';

interface UserState {
    Users: UserEntities[];
    selectedUser: UserEntities | null;
    RolesMap: Array<any>
    total: number;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    Users: [],
    selectedUser: null,
    RolesMap: [],
    total: 0,
    loading: false,
    error: null
}

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async ({current, pageSize, searchKeyword, filter}: {current: number, pageSize: number, searchKeyword?: string, filter?: Record<string, string>}) => {
        return await UserRepositories.getUsersData(current, pageSize, searchKeyword, filter);
    }
)

export const fetchUsersRoles = createAsyncThunk(
    "user/fetchUserRoles",
    async(current: number) => {
        return await UserRepositories.getRoles(current);
    }
)

export const fetchUserById = createAsyncThunk(
    "/user/fetchUserById",
    async(id: string | undefined) => {
        return await UserRepositories.getUsersById(id)
    }
)

export const updateUserById = createAsyncThunk(
    "/user/updateUserById",
    async(user: UserEntities) => {
        return await UserRepositories.UpdateUserById(user)
    }
)

export const addUser = createAsyncThunk(
    "/user/adduser",
    async(user: UserEntities) => {
        return await UserRepositories.AddUser(user)
    }
)

export const deleteMultipleUsers = createAsyncThunk(
    "/user/deleteMultipleUsers",
    async(ids: string[]) => {
        return await UserRepositories.delteMultipleUsers(ids)
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.loading = false;
            state.Users = action.payload.users;
            state.total = action.payload.total;
        });

        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch users';
        });

        builder.addCase(fetchUsersRoles.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(fetchUsersRoles.fulfilled, (state, action) => {
            state.loading = false;
            state.RolesMap = action.payload;
            state.error = null
        })

        builder.addCase(fetchUsersRoles.rejected, (state, action)  => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch users role';
        })

        builder.addCase(fetchUserById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedUser = action.payload;
            state.error = null
        })

        builder.addCase(fetchUserById.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch users by id'
        })

        builder.addCase(updateUserById.pending, (state) => {
            state.loading = false;
            state.error = null
        })

        builder.addCase(updateUserById.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        })

        builder.addCase(updateUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update profile of user'
        })

        builder.addCase(deleteMultipleUsers.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(deleteMultipleUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null
            state.Users = state.Users.filter(user => !action.meta.arg.includes(user.id!));
            state.total -= action.meta.arg.length;
        })

        builder.addCase(deleteMultipleUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to delete multiples user'
        })
    }
});

export default userSlice.reducer;

