interface User {
    id: string;
    email: string;
    name?: string;
}


export const setUserData = (userData: User): void => {
    localStorage.setItem("userData", JSON.stringify(userData));
};

export const getUserData = (): User | null => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
};

export const setAccessToken = (token: string): void => {
    localStorage.setItem("accessToken", token);
};

export const getAccessToken = (): string | null => {
    return localStorage.getItem("accessToken");
};

export const clearUserData = (): void => {
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
};

export const isAuthenticated = (): boolean => {
    return !!getAccessToken() && !!getUserData();
};
