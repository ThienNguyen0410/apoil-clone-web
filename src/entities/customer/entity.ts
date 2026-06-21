export default interface CustomerEntity {
    ID: number,
    name: string,
    phone_number: string,
    date_of_birth: string | null,
    number_of_oil_changes: number,
    next_time_change_oil: string,
    status: boolean,
    action: any,
}