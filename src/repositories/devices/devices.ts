import type DeviceEntites from "../../entities/devices/entity";
import api from '../api'

export const DeviceRepository = {
    async getAllDevices(
        current=1,
        pageSize=10
    ): Promise<{devices: DeviceEntites[], total: number}>
    {
        try {
            const res = await api.get("/api/Devices", {
                params: {
                    Current: current,
                    PageSize: pageSize
                }
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
                total: data.pageInfo?.totalCount ?? 0,
            }
        }
        catch(err) {
            console.error("Error fetching device!", err)
            throw err;
        }
    }
}