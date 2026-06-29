import api from '../api';
import type UserEntities from '../../entities/user/entity';
import type Pagination from '../../entities/pagination';


export const UserRepositories = {
    async getCustomerProfile() : Promise<UserEntities> {
        try {
            const res= await api.get('/api/Users/me');
            const {data} = res.data;
            return {
                username: data.username,
                fullname: data.name,
                phone_number: data.phoneNumber,
                email: data.email,
            }
        }
        catch(err) {
            console.error('Error fetching user profile:', err);
            throw err;
        }
    }
}