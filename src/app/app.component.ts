import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CurrencyService} from "./service/currency.service";
import {ResponseCurrencyDto} from "./dto/response.currency.dto";
import {AllCurrencyDto} from "./dto/all.currency.dto";
import {ResponseCurrencyQueryDto} from "./dto/response.currency.query.dto";
import {environment} from "../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']
}) // export class AppComponent implements OnInit {
//   title = 'arquitectura';
//   currencyForm: FormGroup;
//   responseCurrencyDto: ResponseCurrencyDto;
//
//   // Pagination
//   allCurrencyDto: AllCurrencyDto;
//   responseCurrencyQueryDtos: [ResponseCurrencyQueryDto];
//   actualPage: number = 0;
//   totalPages: number = 0;
//   totalItems: number = 0;
//
//   constructor(private formbuilder: FormBuilder, private currencyService: CurrencyService) {
//     this.currencyForm = this.formbuilder.group({
//       from: '',
//       to: '',
//       amount: ''
//     })
//   }
//
//   ngOnInit() {
//     this.getPagination(0, 5);
//   }
//
//   submit() {
//     console.log(environment.API_KEY);
//     console.log(this.currencyForm.value);
//     this.currencyService.convertCurrency(this.currencyForm.value.to, this.currencyForm.value.from, this.currencyForm.value.amount).subscribe(
//       {
//         next: (data) => {
//           console.log("Success");
//           console.log(data);
//           this.responseCurrencyDto = data;
//           console.log("Result:");
//           console.log(this.responseCurrencyDto.result);
//         },
//         error: (error) => console.log("Error:", error)
//       }
//     );
//   }
//
//   getPagination(page: number, size: number) {
//     this.currencyService.getCurrency(page, size).subscribe(
//       {
//         next: (data) => {
//           console.log("Success");
//           console.log(data);
//           this.allCurrencyDto = data;
//
//           this.responseCurrencyQueryDtos = this.allCurrencyDto.data;
//           this.actualPage = this.allCurrencyDto.currentPage;
//           this.totalPages = this.allCurrencyDto.totalPages;
//           this.totalItems = this.allCurrencyDto.totalItems;
//         },
//         error: (error) => console.log("Error:", error)
//       }
//     );
//   }
// }

export class AppComponent implements OnInit {
  title = 'arquitectura';
  currencyForm: FormGroup;
  responseCurrencyDto: ResponseCurrencyDto;

  // Pagination
  allCurrencyDto: AllCurrencyDto;
  responseCurrencyQueryDtos: [ResponseCurrencyQueryDto];
  actualPage: number = 0;
  totalPages: number = 0;
  totalItems: number = 0;

  //Table:
  displayedColumns: string[] = ['ID', 'Moneda Origen', 'Moneda Destino', 'Monto', 'Resultado', 'Fecha'];
  dataSource: MatTableDataSource<ResponseCurrencyQueryDto>
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formbuilder: FormBuilder, private currencyService: CurrencyService) {
    this.currencyForm = this.formbuilder.group({
      from: '', to: '', amount: ''
    })
  }

  ngOnInit() {
    this.getPagination(0, 5);
    //Table
    this.currencyService.getCurrency(0, 5).subscribe({
      next: (data) => {
        this.allCurrencyDto = data;
        this.dataSource = new MatTableDataSource<ResponseCurrencyQueryDto>(this.allCurrencyDto.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error: (error) => console.log("Error:", error)
    });
  }

  submit() {
    console.log(environment.API_KEY);
    console.log(this.currencyForm.value);
    this.currencyService.convertCurrency(this.currencyForm.value.to, this.currencyForm.value.from, this.currencyForm.value.amount).subscribe({
      next: (data) => {
        console.log("Success");
        console.log(data);
        this.responseCurrencyDto = data;
        console.log("Result:");
        console.log(this.responseCurrencyDto.result);
      }, error: (error) => console.log("Error:", error)
    });
  }

  getPagination(page: number, size: number) {
    this.currencyService.getCurrency(page, size).subscribe({
      next: (data) => {
        console.log("Success");
        console.log(data);
        this.allCurrencyDto = data;

        this.responseCurrencyQueryDtos = this.allCurrencyDto.data;
        this.actualPage = this.allCurrencyDto.currentPage;
        this.totalPages = this.allCurrencyDto.totalPages;
        this.totalItems = this.allCurrencyDto.totalItems;

        //Table
        this.allCurrencyDto = data;
        this.dataSource = new MatTableDataSource<ResponseCurrencyQueryDto>(this.allCurrencyDto.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, error: (error) => console.log("Error:", error)
    });
  }

  filterValue: string;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
