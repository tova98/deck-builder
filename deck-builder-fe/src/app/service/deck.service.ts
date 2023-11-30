import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Deck } from 'src/app/model/deck';
import { Observable } from 'rxjs';
import { DeckDto } from '../dto/deck.dto';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private decksUrl: string;

  constructor(private http: HttpClient) {
    this.decksUrl = 'http://localhost:8080/api/deck';
  }

  getDeck(deckId: number): Observable<Deck> {
    return this.http.get<Deck>(this.decksUrl + `/${deckId}`);
  }

  findAllFiltered(page: number, size: number, title: string) {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);

    if(title != null) {
      params = params.append("title", title);
    }
    
    return this.http.get(this.decksUrl + `/all`, { params: params });
  }

  getDecksFilteredCount(title: string) {
    let params = new HttpParams();

    if(title != null) {
      params = params.append("title", title);
    }

    return this.http.get<number>(this.decksUrl + `/all/count`, { params: params });
  }

  findAllFilteredByUser(userId: number, page: number, size: number, title: string) {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);

    if(title != null) {
      params = params.append("title", title);
    }

    return this.http.get(this.decksUrl + `/all/user/${userId}`, { params: params});
  }

  getDecksFilteredByUserCount(userId: number, title: string) {
    let params = new HttpParams();

    if(title != null) {
      params = params.append("title", title);
    }

    return this.http.get<number>(this.decksUrl + `/all/count/user/${userId}`, { params: params });
  }

  save(deck: DeckDto) {
    return this.http.post(this.decksUrl, deck);
  }

  update(deckId: number, deck: DeckDto) {
    return this.http.put(this.decksUrl + `/${deckId}`, deck);
  }

  delete(deckId: number) {
    return this.http.delete(this.decksUrl + `/${deckId}`);
  }
}
