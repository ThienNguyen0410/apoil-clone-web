import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type DeviceEntites from '../../entities/devices/entity'
import { DeviceRepository } from '../../repositories/devices/devices'


interface DeviceState {
    Devices: DeviceEntites[]
    total: number,
    loading: boolean,
    error: string | null
}

const initialState: DeviceState = {
    Devices: [],
    total: 0,
    loading: false,
    error: null
}

export const fetchDeviceData = createAsyncThunk(
    "/device/fetchDeviceData",
    async({current, pageSize}: {current: number, pageSize: number}) => {
        return await DeviceRepository.getAllDevices(current, pageSize)
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
    }
})

export default deviceSlice.reducer