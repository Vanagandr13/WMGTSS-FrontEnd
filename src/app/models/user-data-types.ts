export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: Role;
    token?: string;
}

export enum Role {
    Student = 'Student',
    Tutor = 'Tutor'
}