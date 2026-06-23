import axios from 'axios';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWNhdGlvbiI6IjVlYTJlMmY5LWRjODAtNDAzYi05ZDM0LWVmZjYyZWYzNWY1MyIsIm1vZGVsVHlwZSI6IkluZnJhc3RydWN0dXJlLk1vZHVsZXMuVXNlcnMuRW50aXRpZXMuVXNlciIsImV4cCI6MTc4Mjc4ODAzN30.sGtaweVvX_scU0_2UUtGav7hN4LrCL_QIufOmf-3YwE';

const api = axios.create({
    baseURL: 'https://apsp-oilchange-api.dev.altasoftware.vn',
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
});

export default api;
