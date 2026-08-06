import api from '../api'
import type { ProductEntities } from '../../entities/product/entity'

export const ProductRepositories = {
    async getProductData(current=1, pageSize=7, search?: string, filter?: Record<string, string>[]): Promise<{products: ProductEntities[]}> {
        try {
            const params:Record<string, any> = {
                current: current,
                pageSize: pageSize,
                searchKeyword: search
            }

            const res = await api.get("/api/Products", {
                params: params
            })

            const {data} = res.data
            return {
                products: data.pagedData.map((item: any) => ({
                    id: item.id,
                    code: item.code,
                    name: item.name
                }))
            }
        }
        catch(err) {
            console.error("Failed to fetch product data!", err)
            throw err;
        }
    }
}