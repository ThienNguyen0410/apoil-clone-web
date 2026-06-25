import type { UserPayLoad } from '../../entities/user/entity';
import type UserEntities from "../../entities/user/entity";
import api from '../api';


export const authRepository = {
    async login(payload: UserPayLoad): Promise<UserEntities> {
        try {
            const response = await api.post('/api/Users/SignIn', {
                username: payload.username,
                password: payload.password
            });

            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
            return response.data.data;
        } catch (error) {
            throw new Error('Invalid username or password');
        }
    }
}