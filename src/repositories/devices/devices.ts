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

                    const getCapacityByEngineType = (type: number) =>
                        infos.find((f: any) => f.product?.engineType === type)
                            ?.currentCapacity ?? 0;

                    return {
                        id: item.id,
                        device_code: item.code,
                        device_name: item.name,
                        device_group: item.deviceGroups?.[0]?.name || '',
                        installed_address: item.specificAddress || '',
                        waste_oil_tank: getCapacityByEngineType(3),
                        gear_oil: getCapacityByEngineType(2),
                        scooter_oil: getCapacityByEngineType(1),
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