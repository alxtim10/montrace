export interface TrackerType {
    date: Date;
    name: string;
    nominal: number;
    type: number;
    category: number;
    refreshToken?: string;
}

export interface TrackerResponse {
    id: number;
    date: Date;
    name: string;
    nominal: number;
    typeId: number;
    type_name: string;
    categoryId: number;
    category_name: string;
    userId: number;
}