export interface PaymentEntities {
    id: string,
    device_name: string,
    transaction_code: string,
    discount_code: string,
    accumulated_point: string,
    discount: string,
    total_payment: string,
    payment_code: string,
    oil_name: string,
    created_at: string,
    payment_time: string,
    payment_status: number,
    refund: number | boolean | string,
    export_invoice: number | boolean | string,

}