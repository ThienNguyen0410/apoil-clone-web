
import type {DeviceGroupsEntities, DeviceEntities} from "../../entities/devices/entity";
import api from '../api'

export const DeviceRepository = {
    async getAllDevices(
        current=1,
        pageSize=7,
        search?: string,
        filter?: Record<string, string>,
        sortQuery?: string
    ): Promise<{devices: DeviceEntities[], total: number}>
    {
        try {
            const params: Record<string, any> = {
                current: current,
                pageSize: pageSize,
                searchKeyword: search
            }

            if (filter) {
                for (const [key, value] of Object.entries(filter)) {
                    params[`filter.${key}`] = value
                }
            }

            if (sortQuery) params.sortQuery = sortQuery

            const res = await api.get("/api/Devices", {
                params: params
            })

            const {data} = res.data;
            return {
                devices: data.pagedData.map((item: any) => {
                    const infos = item.currentTransfer?.fuelTransferInfos || [];

                    return {
                        id: item.id,
                        device_code: item.code,
                        device_name: item.name,
                        device_group: item.deviceGroups?.[0]?.name || '',
                        installed_address: item.specificAddress || '',
                        waste_oil_tank: {
                            currValue: infos[0].currentCapacity,
                            maxValue: item.currentTransfer.pumpMaximumCapacity
                        },
                        gear_oil: {
                            currValue: infos[1].currentCapacity,
                            maxValue: item.currentTransfer.pumpMaximumCapacity
                        },
                        scooter_oil: {
                            currValue: infos[2].currentCapacity,
                            maxValue: item.currentTransfer.pumpMaximumCapacity
                        },
                        status: item.operationStatus ?? 0,
                    }
                }),
                total: data.pageInfo?.totalCount ,
            }
        }
        catch(err) {
            console.error("Error fetching device!", err)
            throw err;
        }
    },

    async getAllDeviceGroup(current=1, pageSize=7): Promise<{groups: DeviceGroupsEntities[]}> {
        try {
            const params = {
                current: current,
                pageSize: pageSize
            }

            const res = await api.get("/api/DeviceGroups",{
                params: params
            })

            const {data} = res.data;
            return {
                groups: data.pagedData.map((item: any) => ({
                    group_id: item.id,
                    group_name: item.name
                }))
            }
        }
        catch(err) {
            console.error('Error fetching data of device group', err)
            throw err;
        }
    },

    async getProvinces(current=1, pageSize=9999) : Promise<{provinces: {province_id: string, province_name: string} []}> {
        try {
            const params = {
                current: current,
                pageSize: pageSize
            }
            const res = await api.get("/api/Provinces",
                {
                    params: params
                }
            )

            const {data} = res.data
            return {
                provinces: data.pagedData.map((item: any) => ({
                    province_id: item.id,
                    province_name: item.name
                }))
            }
        }
        catch(err) {
            console.error("Error fetching provinces data!")
            throw err;
        }
    },

    async getDistrict(current=1, pageSize=9999, filter?: Record<string, string>):Promise<{districts: {district_id: string, district_name: string}[]}> {
        try {
            const params :Record<string, any> = {
                current: current,
                pageSize: pageSize
            }

            if (filter) {
                for (const [key, value] of Object.entries(filter)) {
                    params[`filter.${key}`] = value
                }
            }

            const res = await api.get("/api/Districts", {
                params: params
            })

            const {data} = res.data
            return {
                districts: data.pagedData.map((item: any) => ({
                    district_id: item.id,
                    district_name: item.name
                }))
            }
        }
        catch(err) {
            console.error("Erro fetching district data!")
            throw err;
        }
    },

     async getWard(current=1, pageSize=9999, filter?: Record<string, string>):Promise<{wards: {ward_id: string, ward_name: string}[]}> {
        try {
            const params: Record<string, any> = {
                current: current,
                pageSize: pageSize
            }

            if (filter) {
                for (const[key, value] of Object.entries(filter)) {
                    params[`filter.${key}`] = value
                }
            }

            const res = await api.get("/api/Communes", {
                params: params
            })

            const {data} = res.data
            return {
                wards: data.pagedData.map((item: any) => ({
                    ward_id: item.id,
                    ward_name: item.name
                }))
            }
        }
        catch(err) {
            console.error("Error fetching commune data!")
            throw err;
        }
    },



    async getDeviceById(id: string) {
        try {
            const res = await api.get(`/api/Devices/${id}`)
            const item = res.data.data
            const infos = item.currentTransfer?.fuelTransferInfos || []
            return {
                id: item.id,
                device_code: item.code,
                device_name: item.name,
                device_group: item.deviceGroups?.[0]?.name || '',
                device_group_id: item.deviceGroups?.map((g: any) => g.id) || [],
                installed_address: item.specificAddress || '',
                longitude: String(item.longitude ?? ''),
                latitude: String(item.latitude ?? ''),
                provinceid: item.province?.id || '',
                districtid: item.district?.id || '',
                communeid: item.commune?.id || '',
                address: item.specificAddress || '',
                phone_number: item.hotline || '',
                status: item.operationStatus ?? 1,
                image: null as File | null,
                waste_oil_tank: {
                    currValue: infos[0]?.currentCapacity ?? 0,
                    maxValue: item.currentTransfer?.pumpMaximumCapacity ?? 1
                },
                gear_oil: {
                    currValue: infos[1]?.currentCapacity ?? 0,
                    maxValue: item.currentTransfer?.pumpMaximumCapacity ?? 1,
                    price: infos[1]?.product.price ?? 0,
                    priceReduction: infos[1]?.product.priceReduction ?? 0
                },
                scooter_oil: {
                    currValue: infos[2]?.currentCapacity ?? 0,
                    maxValue: item.currentTransfer?.pumpMaximumCapacity ?? 1,
                    price: infos[2]?.product.price,
                    priceReduction: infos[2]?.product.priceReduction
                }
            }
        }
        catch(err) {
            console.error("Error fetching device by id!", err)
            throw err;
        }
    },

    async updateDeviceById(id: string, device: Partial<DeviceEntities>) {
        try {
            const formData = new FormData()
            formData.append("Name", device.name ?? "")
            formData.append("Password", device.password ?? "")
            formData.append("Longitude", device.longitude ?? "")
            formData.append("Latitude", device.latitude ?? "")
            formData.append("SpecificAddress", device.address ?? "")
            formData.append("Hotline", device.phone_number ?? "")
            formData.append("OperationStatus", device.status === 1 ? "1" : "2")
            formData.append("ProvinceId", device.provinceid ?? "")
            formData.append("DistrictId", device.districtid ?? "")
            formData.append("CommuneId", device.communeid ?? "")
            formData.append("DeviceGroupIds", device.device_group_id?.join(",") ?? "")
            if (device.image) formData.append("Image", device.image)

            await api.put(`/api/Devices/${id}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
        }
        catch(err) {
            console.error("Error updating device!", err)
            throw err;
        }
    },

    async addDevice(device: Partial<DeviceEntities>) {
        try {
            const formData = new FormData()
            formData.append("Code", device.code ?? "")
            formData.append("Name", device.name ?? "")
            formData.append("Password", device.password ?? "")
            formData.append("Longitude", device.longitude ?? "")
            formData.append("Latitude", device.latitude ?? "")
            formData.append("SpecificAddress", device.address ?? "")
            formData.append("Hotline", device.phone_number ?? "")
            formData.append("OperationStatus", device.status === 1 ? "1" : "2")
            formData.append("ProvinceId", device.provinceid ?? "")

            formData.append("DistrictId", device.districtid ?? "")
            formData.append("CommuneId", device.communeid ?? "")
            formData.append("DeviceGroupIds", device.device_group_id?.join(",") ?? "")

            if (device.image) formData.append("Image", device.image)

            await api.post("/api/Devices", formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
        }
        catch(err) {
            console.error("Error adding new device", err)
            throw err;
        }
    }
}