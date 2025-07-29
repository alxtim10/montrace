export interface BudgetType {
    id: number;
    name: string;
    nominal?: string;
    spent?: string;
    typeId: number;
    typeName: string;
    categoryId: number;
    categoryName: string;
    userId: number;
    email: string;
    password: string;
    refreshToken?: string;
    balance?: string;
}

export interface BudgetRequestType {
    name: string;
    nominal?: number;
    spent?: number;
    typeId: number;
    type_name: string;
    categoryId: number;
    category_name: string;
    userId: number;
}