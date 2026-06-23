export default interface CustomerEntity {
    id: string;
    name: string;
    phoneNumber: string;
    status: number;
    provider: number;
    birthDay: string | null;
    oilChangeStatus: number;
    nearestOilChangeVehicle: {
        numberOfChangeOil: number;
        nearestOilChange: {
            nextOilChangeDay: string;
            nextOilChangeRemainingDay: number;
        } | null;
    } | null;
}