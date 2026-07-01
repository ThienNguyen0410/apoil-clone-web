import axios from 'axios';
import dayjs from 'dayjs'
import { store } from '../presenters/store';
import { logout, updateTokens } from '../presenters/slices/authSlice';
export const STORAGE_KEY = {
    ACCESS: 'accessToken',
    REFRESH: 'refreshToken',
};

const BASE_URL = 'https://apsp-oilchange-api.dev.altasoftware.vn';

// --- Token helpers ---

function getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEY.ACCESS);
}

function getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEY.REFRESH);
}

function setTokens(access: string, refresh: string) {
    localStorage.setItem(STORAGE_KEY.ACCESS, access);
    localStorage.setItem(STORAGE_KEY.REFRESH, refresh);
}

function isTokenExpired(token: string): boolean {
    try {
        const now = dayjs()
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < now.valueOf();
    } catch {
        return true;
    }
}

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});


let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function onRefreshed(token: string) {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
}

async function doRefreshToken(): Promise<string> {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.post(`${BASE_URL}/api/Users/RefreshToken`, {
        refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    setTokens(accessToken, newRefreshToken);
    store.dispatch(updateTokens({ accessToken, refreshToken: newRefreshToken }));
    return accessToken;
}

// --- Request interceptor: attach token, refresh if expired ---

api.interceptors.request.use(async (config) => {
    let token = getAccessToken();

    if (token && isTokenExpired(token)) {
        try {
            token = await doRefreshToken();
        } catch {
            token = null;
        }
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// --- Response interceptor: catch 401 and retry ---

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (!isRefreshing) {
            isRefreshing = true;
            try {
                const newToken = await doRefreshToken();
                isRefreshing = false;
                onRefreshed(newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                refreshSubscribers = [];
                localStorage.removeItem(STORAGE_KEY.ACCESS);
                localStorage.removeItem(STORAGE_KEY.REFRESH);
                store.dispatch(logout());
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return new Promise((resolve) => {
            refreshSubscribers.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
            });
        });
    },
);

export default api;
