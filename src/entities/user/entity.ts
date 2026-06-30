export default interface UserEntities {
    id?: string;
    username?: string;
    fullname?: string;
    phone_number?: string;
    email: string;
    //roleId?: string;
    isAuthenticated?: boolean;
    accessToken?: string;
    refreshToken?: string;
}


export interface UserPayLoad {
    username: string;
    password: string;
}

