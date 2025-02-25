// export  interface ISignupData {
//     username: string;
//     email: string;
//     password: string;
// }

// export interface signInData {
//     email: string;
//     password: string;
// }

export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface AuthData {
    user: User;
    accessToken: string;
}
