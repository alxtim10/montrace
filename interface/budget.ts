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