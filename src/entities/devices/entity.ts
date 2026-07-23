export default interface DeviceEntites {
    id: string,
    device_code: string,
    device_name: string,
    device_group: string,
    installed_address: string,
    waste_oil_tank:  {
        currValue: number,
        maxValue: number
    },
    gear_oil: {
        currValue: number,
        maxValue: number
    },
    scooter_oil: {
        currValue: number,
        maxValue: number
    },

    status: number,
}

export default interface DeviceGroupsEntities {
    groud_id: string,
    group_name: string,
}