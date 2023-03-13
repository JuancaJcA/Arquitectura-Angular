import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseCurrencyDto} from "../dto/response.currency.dto";
import {AllCurrencyDto} from "../dto/all.currency.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  // API KEY
  // private API_URL = 'http://localhost:8008/api/v1/';
  private API_URL = environment.BACKEND_URL;

  constructor(private http: HttpClient) {
  }

  public convertCurrency(from: string, to: string, amount: string): Observable<ResponseCurrencyDto> {
    return this.http.get<ResponseCurrencyDto>( this.API_URL+ '/api/v1/exchange/' + to + "/" + from + "/" + amount);
  }

  public getCurrency(page: number, size: number): Observable<AllCurrencyDto> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<AllCurrencyDto>(this.API_URL + "/api/v1/pagination", {params: params});
  }
}
