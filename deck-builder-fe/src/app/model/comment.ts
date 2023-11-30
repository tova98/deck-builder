import { User } from "./user";

export class Comment {
    id!: number;
    text!: string;
    user!: User;
    timestamp!: Date;
}