import api from '../api';
import type UserEntities from '../../entities/user/entity';

export const UserRepositories = {
    async getCustomerProfile() : Promise<UserEntities> {
        try {
            const res= await api.get('/api/Users/me');
            const {data} = res.data;
            return {
                id: data.id,
                username: data.username,
                fullname: data.name,
                phone_number: data.phoneNumber,
                email: data.email,
                avatarPath: data.avatarPicture?.originPath
            }
        }
        catch(err) {
            console.error('Error fetching user profile:', err);
            throw err;
        }
    },
    async changeProfile(user: UserEntities) {
        try  {
            const formData = new FormData();
            formData.append('Name', user.fullname || '');
            formData.append('PhoneNumber', user.phone_number || '');
            formData.append('Email', user.email || '');
            if (user.avatarFile) formData.append('AvatarPicture', user.avatarFile);

            const res = await api.put(`/api/Users/me`, formData , {
                headers: {'Content-Type': 'multipart/form-data'}
            });


            const {data} = res.data;
            console.log('changeProfile response data:', data);
            console.log('changeProfile avatarPicture:', data.avatarPicture);
            console.log('changeProfile originPath:', data.avatarPicture?.originPath);

            return {
                id: data.id,
                username: data.username,
                fullname: data.name,
                phone_number: data.phoneNumber,
                email: data.email,
                avatarPath: data.avatarPicture?.originPath
            }
        }
        catch(err) {
            console.log("Error updating profile: ", err);
            throw err;
        } 
    },

    async changePassword(oldPassword: string, newPassword: string) {
        try {
            await api.put(`/api/Users/me/ChangePassword`, {
                oldPassword: oldPassword,
                password: newPassword
            });
        }
        catch(err) {
            console.log("Error changing password: ", err);
            throw err;
        }
    }
}