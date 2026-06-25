export default interface UserEntities {
    id: string;
    userrname: string;
    email: string;
    isAuthenticated: boolean;
    accessToken: string;
    refreshToken: string;
}


export interface UserPayLoad {
    username: string;
    password: string;
}

