import {ResponseCurrencyQueryDto} from "./response.currency.query.dto";

export interface AllCurrencyDto {
  data: [ResponseCurrencyQueryDto],
  currentPage: number,
  totalItems: number,
  totalPages: number

}
