export interface ICustomer {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    personalKey: string,
    isActive: boolean;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}

export enum Role {
    USER = "user",
    ADMIN = "admin",
    GUEST = "guest"
}