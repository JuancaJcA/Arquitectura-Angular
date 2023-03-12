import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseCurrencyDto} from "../dto/response.currency.dto";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {
  }

  // public convertCurrency(from: string, to: string, amount: string): Observable<any> {
  //   return this.http.get("http://localhost:8008/api/v1/exchange/" + to + "/" + from + "/" + amount);
  // }

  public convertCurrency(from: string, to: string, amount: string): Observable<ResponseCurrencyDto> {
    return this.http.get<ResponseCurrencyDto>("http://localhost:8008/api/v1/exchange/" + to + "/" + from + "/" + amount);
  }
}
