import { CardImage } from "./card-image";

export class Card {
    id!: number;
    name!: string;
    type!: string;
    desc!: string;
    card_images!: CardImage[];
}