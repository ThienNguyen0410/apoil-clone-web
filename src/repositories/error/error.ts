import api from '../api'
import type { ErrorEntities } from '../../entities/error/entity'

export const ErrorRepositories = {
    async getErrorData(current=1, pageSize=7, search?: string, filter?: Record<string, any>):Promise<{errors: ErrorEntities[], total: number}> {
        try {
            const params: Record<string, any> = {
                current: current,
                pageSize: pageSize,
                searchKeyword: search
            }

            if (filter) {
                for (const[key, value] of Object.entries(filter)) {
                    params[`filter.${key}`] = value
                }
            }

            const res = await api.get("/api/Errors", {
                params: params
            })

            const {data} = res.data
            return {
                errors: data.pagedData.map((item: any) => ({
                    id: item.id,
                    code: item.errorType.code,
                    device: item.device.name,
                    category: item.errorType.source,
                    content: item.content,
                    description: item.errorType.description,
                    status: item.status,
                    processed_employee: '',
                    processed_time: ''
                })),
                total: data.pageInfo?.totalCount ?? 0
            }
        }
        catch(err) {
            console.error('Error fetching error data', err)
            throw err;
        }
    },

    async getErrorById(id: string): Promise<{errors: ErrorEntities}> {
        try {
            const res = await api.get(`/api/Errors/${id}`)

            const {data} = res.data
            return {
                errors:{
                    id: data.errorType.id,
                    code: data.errorType.code,
                    device: data.device.name,
                    category: data.errorType.source,
                    content: data.content,
                    description: data.errorType.description,
                    status: data.status,
                    processed_employee: '',
                    processed_time: '',
                    contact: data.contact,
                    error_time: data.createdAt
                }
            }
        }
        catch(err) {
            console.error("Error fetching data of error of id: ", err)
            throw err;
        }
    }
}