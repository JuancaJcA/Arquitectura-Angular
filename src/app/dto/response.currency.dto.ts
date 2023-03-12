import {QueryDto} from "./query.dto";

export interface ResponseCurrencyDto {

  date: string,
  result: number
  success: boolean,
  query: QueryDto
}
