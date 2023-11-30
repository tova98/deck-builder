import { User } from 'src/app/model/user';
import { Card } from './card';
import { Comment } from './comment';

export class Deck {
    id!: number;
    title!: string;
    description!: string;
    user!: User;
    cards!: Card[];
    comments!: Comment[];
}
