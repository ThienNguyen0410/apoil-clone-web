import api from '../api';
import type CustomerEntity from '../../entities/customer/entity';
import type Pagination from '../../entities/pagination';


export const customerRepository = {
    async getAllCustomers(
        current = 1,
        pageSize = 10,
        filter = {}
    ): Promise<{
        customers: CustomerEntity[];
        pagination: Pagination;
    }> {
        try {
            const response = await api.get('/api/Customers', {
                params: {
                    Current: current,
                    PageSize: pageSize,
                    ...filter,
                }
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
    }
    
}

