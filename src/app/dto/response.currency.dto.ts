import {QueryDto} from "./query.dto";
import {ResponseCurrencyQueryDto} from "./response.currency.query.dto";

export interface ResponseCurrencyDto {

  date: string,
  result: number
  success: boolean,
  query: QueryDto
}
