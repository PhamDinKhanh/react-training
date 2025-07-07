export interface User {
    id: string;
    avatar?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    city?: string;
    country?: string;
    address?: string;
    phoneNumber?: string;
    birthday?: string;
    organization?: string;
    role?: string;
    department?: string;
    zipCode?: string;
    biography?: string;
    status?: string;
}

export interface Production {

}

export interface Account {
    id: string;
    userName: string;
    role: string;
    userId: string
}

export interface KYCData {
    idType: string;
    idNumber: string;
    idFront: File | null;
    idBack: File | null;
    selfie: File | null;
};