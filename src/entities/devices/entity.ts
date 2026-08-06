export interface DeviceEntities {
    id: string,
    device_code: string,
    device_name: string,
    device_group: string,
    code: string,
    name: string,
    device_group_id: string[],
    installed_address: string,
    phone_number: string,
    password: string,
    password_confirm: string,
    longitude: string,
    latitude: string,
    provinceid: string,
    districtid: string,
    communeid: string,
    address: string,
    waste_oil_tank:  {
        currValue: number,
        maxValue: number
    },
    gear_oil: {
        currValue: number,
        maxValue: number
        price: number,
        priceReduction: number
    },
    scooter_oil: {
        currValue: number,
        maxValue: number,
        price: number,
        priceReduction: number
    },
    status: number,
    image: File | null
}

export interface DeviceGroupsEntities {
    group_id: string,
    group_name: string,
}