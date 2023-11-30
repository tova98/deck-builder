import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../model/card';

@Injectable({
    providedIn: 'root'
})
export class CardService {

    private cardsUrl: string;

    constructor(private http: HttpClient) {
        this.cardsUrl = 'http://localhost:8080/api/cache';
    }

    getAllCards() {
        return this.http.get<Card[]>(this.cardsUrl);
    }
}