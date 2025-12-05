import api from "@/lib/axios";



export const registerUSer = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    } catch (error :any) {
        const message = error.response?.data?.message || 'Failed to register user';
        throw new Error(message);
    }
};

export const loginUSer = async ({ email, password }: { email: string, password: string }) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error :any) {
        const message = error.response?.data?.message || 'Failed to login user';
        throw new Error(message);
    }
};



export const logoutUser = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error :any) {
        const message = error.response?.data?.message || 'Failed to logout user';
        throw new Error(message);
    }
};


export const refreshAccessToken = async () => {
    try {
        const response = await api.post('/auth/refresh');
        return response.data;
    } catch (error :any) {
        const message = error.response?.data?.message || 'Failed to refresh access token';
        throw new Error(message);
    }
};