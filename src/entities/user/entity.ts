export default interface UserEntities {
    id?: string;
    id_num?: string;
    username?: string;
    password?: string;
    fullname?: string;
    phone_number?: string;
    email?: string;
    role?: string;
    roleID?: string;
    status?: number;
    address?: string;
    isAuthenticated?: boolean;
    accessToken?: string;
    refreshToken?: string;
    avatarPath?: string; // Received image path from server
    avatarFile?: File;   // Image file (binary) to upload to server through API PUT/customers/me
}

