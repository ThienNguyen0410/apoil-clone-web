import api from '../api';
import type UserEntities from '../../entities/user/entity';

export const UserRepositories = {
    async getCustomerProfile() : Promise<UserEntities> {
        try {
            const res = await api.get('/api/Users/me');
            const {data} = res.data;
            return {
                id: data.id,
                username: data.username,
                fullname: data.name,
                phone_number: data.phoneNumber,
                email: data.email,
                avatarPath: data.avatarPicture
                
            }
        }
        catch(err) {
            console.error('Error fetching user profile:', err);
            throw err;
        }
    },

    async getUsersData(current=1, pageSize=7, search?: string, filter?: Record<string, string>): Promise<{ users: UserEntities[], total: number }> {
        try {
            const params: Record<string, any> = {
                current: current, 
                pageSize: pageSize,
                searchKeyword: search,
            }

            if (filter) {
                for (const [key, value] of Object.entries(filter)) {
                    params[`filter.${key}`] = value
                }
            }

            const res = await api.get("api/Users", {
                params: params
            });

            const {data} = res.data;

            return {
                users: data.pagedData.map((item: any) => ({
                    id: item.id,
                    username: item.username,
                    fullname: item.name,
                    phone_number: item.phoneNumber,
                    email: item.email,
                    role: item.role.name,
                    roleID: item.role.id,
                    status: item.status ? true : false,
                })),
                total: data.pageInfo?.totalCount ?? 0
            }
            
        }
        catch(err) {
            console.error('Error fetching users data', err)
            throw err;
        }
    },

    async getUsersById(id: string | undefined) {
        try  {
            const res = await api.get(`/api/Users/${id}`);
            const {data} = res.data;
            return {
                id: data.id,
                username: data.username,
                fullname: data.name,
                role: data.role?.name,
                roleID: data.role?.id,
                phone_number: data.phoneNumber,
                email: data.email,
                status: data.status ? true : false,
                avatarPath: data.avatarPicture,
                address: data.address,
            }
        }
        catch(err) {
            console.error(`Error fetching users data by id: ${id}`)
            throw err;
        }
    },

    async getRoles(current=1) {
        try {
            const res = await api.get("/api/Roles", {
                params: {
                    Current: current
                }
            })

            const {data} = res.data
            return data.pagedData.map((item: any) => ({
                id: item.id,
                role_name: item.name
            }))

        }
        catch(err) {
            console.error("Error fetching roles data")
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

            return {
                id: data.id,
                username: data.username,
                fullname: data.name,
                phone_number: data.phoneNumber,
                email: data.email,
                avatarPath: data.avatarPicture
            }
        }
        catch(err) {
            console.log("Error updating profile: ", err);
            throw err;
        } 
    },

    async UpdateUserById(user: UserEntities) {
        try {
            const id = user.id
            const formData = new FormData()
            formData.append("Email", user.email)
            if (user.avatarFile) formData.append('AvatarPicture', user.avatarFile);
            formData.append("Name", user.fullname ?? "");
            formData.append("PhoneNumber", user.phone_number ?? "")
            formData.append("Status", user.status === true ? "1" : "0")
            formData.append("Address", user.address ?? "");
            formData.append("IdentifierNumber", user.id_num ?? "")
            formData.append("RoleId", user.roleID ?? "")
            
            await api.put(`/api/Users/${id}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })

        }
        catch(err) {
            console.error("Failed to update profile")
            throw err;
        }
    },

    async AddUser(user: UserEntities) {
        try {
            const formData = new FormData()
            formData.append("Username", user.username?? "")
            formData.append("Password", user.password ?? "")
            formData.append("Email", user.email)
            if (user.avatarFile) formData.append('AvatarPicture', user.avatarFile);
            formData.append("Name", user.fullname?? "")
            formData.append("PhoneNumber",user.phone_number ?? "")
            formData.append("Status", user.status === true ? "1" : "0")
            formData.append("RoleId", user.roleID ?? "")
            formData.append("Address", user.address ?? "")
            formData.append("IdentifierNumber", user.id_num ?? "")

            await api.post("/api/Users", formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            console.log("Add user successfully!!!!!!!!!!!")
        }

        catch(err) {
            console.error("Failed to add user")
            throw err
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