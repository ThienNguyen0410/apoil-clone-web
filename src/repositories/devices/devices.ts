import type DeviceEntites from "../../entities/devices/entity";
import type DeviceGroupEntities from "../../entities/devices/entity";
import api from '../api'

export const DeviceRepository = {
    async getAllDevices(
        current=1,
        pageSize=7,
        search?: string,
        filter?: Record<string, string>,
        sortQuery?: string
    ): Promise<{devices: DeviceEntites[], total: number}>
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

    async getAllDeviceGroup(current=1, pageSize=7): Promise<{groups: DeviceGroupEntities[]}> {
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
    }
}