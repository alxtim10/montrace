import { TrackerResponse } from "./tracker";

export interface UserType {
    id: number;
    name: string;
    email: string;
    password: string;
    refreshToken?: string;
    balance?: string;
    saving?: string;
    expense?: string;
}

export interface UserDetail {
    user: UserType,
    tracker: TrackerResponse[]
}