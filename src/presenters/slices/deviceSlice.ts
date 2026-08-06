import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import type {DeviceEntities, DeviceGroupsEntities} from '../../entities/devices/entity'
import { DeviceRepository } from '../../repositories/devices/devices'

interface DeviceState {
    Devices: DeviceEntities[],
    DeviceGroupMap: DeviceGroupsEntities[],
    selectedDevice: DeviceEntities | null;
    Provinces: {province_id: string, province_name: string}[]
    Districts: {district_id: string, district_name: string}[]
    Communes: {ward_id: string, ward_name: string}[]
    total: number,
    loading: boolean,
    error: string | null
}

const initialState: DeviceState = {
    Devices: [],
    DeviceGroupMap: [],
    selectedDevice: null,
    Provinces: [],
    Districts: [],
    Communes: [],
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

export const fetchProvincesData = createAsyncThunk(
    "/devices/fetchProvincesData",
    async({current, pageSize}: {current: number, pageSize: number}) => {
        return await DeviceRepository.getProvinces(current, pageSize)
    }
)

export const fetchDistrictsData = createAsyncThunk(
    "/devices/fetchDistrictsData",
    async({current, pageSize, filter}: {current: number, pageSize: number, filter?: Record<string, string>}) => {
        return await DeviceRepository.getDistrict(current, pageSize, filter)
    }
)
export const fetchCommunesData = createAsyncThunk(
    "/devices/fetchCommunesData",
    async({current, pageSize, filter}: {current: number, pageSize: number, filter?: Record<string, string>}) => {
        return await DeviceRepository.getWard(current, pageSize, filter)
    }
)

export const fetchDeviceById = createAsyncThunk(
    "/device/fetchDeviceById",
    async(id: string) => {
        return await DeviceRepository.getDeviceById(id)
    }
)

export const updateDevice = createAsyncThunk(
    "/device/updateDevice",
    async({id, device}: {id: string, device: Partial<DeviceEntities>}) => {
        return await DeviceRepository.updateDeviceById(id, device as DeviceEntities)
    }
)

export const addDevice = createAsyncThunk(
    "/device/addDevice",
    async(newDevice: Partial<DeviceEntities>) => {
        return await DeviceRepository.addDevice(newDevice)
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

        builder.addCase(fetchProvincesData.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(fetchProvincesData.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.Provinces = action.payload.provinces
            
        })

        builder.addCase(fetchProvincesData.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch provinces data!'
        })

        builder.addCase(fetchDistrictsData.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(fetchDistrictsData.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.Districts = action.payload.districts
        })

        builder.addCase(fetchDistrictsData.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch districts data!'
        })

        builder.addCase(fetchCommunesData.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(fetchCommunesData.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.Communes = action.payload.wards
        })

        builder.addCase(fetchCommunesData.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch communes data!'
        })

        builder.addCase(addDevice.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(addDevice.fulfilled, (state) => {
            state.loading = false;
            state.error = null
        })

        builder.addCase(addDevice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to add new device"
        })

        builder.addCase(fetchDeviceById.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(fetchDeviceById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedDevice = action.payload as DeviceEntities
            state.error = null
        })

        builder.addCase(fetchDeviceById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch device by id"
        })

        builder.addCase(updateDevice.pending, (state) => {
            state.loading = true;
            state.error = null
        })

        builder.addCase(updateDevice.fulfilled, (state) => {
            state.loading = false;
            state.error = null
        })

        builder.addCase(updateDevice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to update device"
        })

    }})
export default deviceSlice.reducer
