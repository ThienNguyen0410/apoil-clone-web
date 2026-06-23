import axios from 'axios';
import type CustomerEntity from '../entities/customer/entity';
import type Pagination from '../entities/pagination';

const api = axios.create({baseURL: 'https://apsp-oilchange-api.dev.altasoftware.vn'})


export const customerRepository = {
    async getAllCustomers(page=1): Promise<{ customers: CustomerEntity[]; pagination: Pagination }> {
        try {
            const response = await api.get('/customers', { params: { page } });
            return response.data;
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw error;
        }
    },

    async getCustomerById(id: string): Promise<CustomerEntity> {
        try {
            const response = await api.get(`/customers/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching customer with ID ${id}:`, error);
            throw error;
        }
    }
    
}

