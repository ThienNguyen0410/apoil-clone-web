import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type DeviceEntites from '../../entities/devices/entity'
import type DeviceGroupEntites from '../../entities/devices/entity'
import { DeviceRepository } from '../../repositories/devices/devices'
import { act } from 'react'


interface DeviceState {
    Devices: DeviceEntites[],
    DeviceGroupMap: DeviceGroupEntites[]
    total: number,
    loading: boolean,
    error: string | null
}

const initialState: DeviceState = {
    Devices: [],
    DeviceGroupMap: [],
    total: 0,
    loading: false,
    error: null
}

export const fetchDeviceData = createAsyncThunk(
    "/device/fetchDeviceData",
    async({current, pageSize, searchKeyword, filter, sortQuery}: {current: number, pageSize: number, searchKeyword?: string, filter?: Record<string, string>, sortQuery?: string}) => {
        return await DeviceRepository.getAllDevices(current, pageSize, searchKeyword, filter, sortQuery)
    }
)

export const fetchDeviceGroupData = createAsyncThunk(
    "/device/fetchDeviceGroupData",
    async({current, pageSize}: {current: number, pageSize: number}) => {
        return await DeviceRepository.getAllDeviceGroup(current,pageSize)
    }
)

const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDeviceData.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(fetchDeviceData.fulfilled,(state, action) => {
            state.loading = false;
            state.error = null
            state.Devices = action.payload.devices
            state.total = action.payload.total
        })

        builder.addCase(fetchDeviceData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch device data!'
        })

        builder.addCase(fetchDeviceGroupData.pending, (state)=> {
            state.loading = true;
            state.error = null
        })

        builder.addCase(fetchDeviceGroupData.fulfilled, (state, action) => {
            state.loading = false;
            state.DeviceGroupMap = action.payload.groups
            state.error = null
        })

        builder.addCase(fetchDeviceGroupData.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch device group data!'
        })
    }
})

export default deviceSlice.reducer