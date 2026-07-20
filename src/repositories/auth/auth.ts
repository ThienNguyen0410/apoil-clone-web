import type UserEntities from "../../entities/user/entity";
import api from '../api';
import {useTranslation} from 'react-i18next';
export const authRepository = {
    async login(payload: UserEntities): Promise<UserEntities> {
        try {
            const response = await api.post('/api/Users/SignIn', {
                username: payload.username,
                password: payload.password
            });

            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
            return response.data.data;
        } 
        catch (error: any) {
            const message = error.response?.data?.message;
            console.error('Error during login:', message);
            throw new Error(message);
        }
    }
}