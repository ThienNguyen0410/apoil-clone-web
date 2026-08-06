import api from '../api'
import type { PaymentEntities } from '../../entities/payment/entity'


export const PaymentRepositories = {
    async getPaymentData(current=1, pageSize=7, search?: string, filter?: Record<string, any>): Promise<{payments: PaymentEntities[], total: number, total_revenue: number, total_discount: number}> {
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
            const res = await api.get("/api/Revenues/Payments", {
                params: params
            })

            const {data} = res.data
            return {
                payments: data.pagedData.map((item: any) => ({
                    id: item.id,
                    device_name: item.oilChangeSession?.device?.name ?? '---',
                    transaction_code: item.oilChangeSession?.code ?? '---',
                    discount_code: item.oilChangeSession?.couponSession?.code ?? '---',
                    accumulated_point: String(item.oilChangeSession?.oilSuctionPoints ?? 0),
                    discount: String(item.oilChangeSession?.couponDiscountAmount ?? 0),
                    total_payment: String(item.oilChangeSession?.totalPayment ?? 0),
                    payment_code: item.gatewayTransactionCode ?? '---',
                    oil_name: item.oilChangeSession?.product?.name ?? '---',
                    created_at: item.createdAt ?? '---',
                    payment_time: item.oilChangeSession?.paymentTime ?? '---',
                    payment_status: item.paymentStatus ?? 0,
                    refund: item.refundStatus ?? 0,
                    export_invoice: item.oilChangeSession?.oilChangeSessionEInvoice?.eInvoiceStatus ?? 0,
                   
                })),
                total: data.pageInfo?.totalCount ?? 0,
                total_revenue: data.moreInfo.totalRevenue,
                total_discount: data.moreInfo.totalDiscount
            }
        }
        catch(err) {
            console.error("Failed to fetch payment data", err)
            throw err;
        }
    }
}
