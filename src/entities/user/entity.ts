export default interface UserEntities {
    id?: string;
    username?: string;
    fullname?: string;
    phone_number?: string;
    email: string;
    isAuthenticated?: boolean;
    accessToken?: string;
    refreshToken?: string;
    avatarPath?: string; // Received image path from server
    avatarFile?: File;   // Image file (binary) to upload to server through API PUT/customers/me
}


export interface UserPayLoad {
    username: string;
    password: string;
}

