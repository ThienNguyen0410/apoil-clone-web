import api from '../api';
import type CustomerEntity from '../../entities/customer/entity';
import type Pagination from '../../entities/pagination';


export const customerRepository = {
    async getAllCustomers(
        current = 1,
        pageSize = 10,
        search?: string,
        filter?: Record<string, string>
    ): Promise<{
        customers: CustomerEntity[];
        pagination: Pagination;
    }> {
        try {

            const params : Record<string,any> = {
                    Current: current,
                    PageSize: pageSize,
                    SearchKeyword: search,
                }

            if (filter) {
                for (const [key, value] of Object.entries(filter)) {
                    params[`filter.${key}`] = value;
                }
            }
            const response = await api.get('/api/Customers', {
                params: params,
            });

            const { data } = response.data;
            return {
                customers: data.pagedData,
                pagination: data.pageInfo,
            };
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw error;
        }
    },

    async getCustomerById(id: string): Promise<CustomerEntity> {
        try {
            const response = await api.get(`/api/Customers/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching customer with ID ${id}:`, error);
            throw error;
        }
    },
}

