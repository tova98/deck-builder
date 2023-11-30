import { Role } from "./role";

export class User {
    id!: number;
    username!: string;
    email!: string;
    password!: string;
    phoneNumber!: string;
    role!: Role
    joinDate!: Date;
    profilePicture!: string;
}
