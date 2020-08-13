export interface User {
    id: number,
    name: string,
    email: string,
    code?: string,
    phone?: string,
    birthday?: string,
    document?: string,
    avatar?: string,
    access_token: string,
    branch: string
}


export interface AvatarResponse {
  avatar: string;
}