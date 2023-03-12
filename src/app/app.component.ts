import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CurrencyService} from "./service/currency.service";
import {ResponseCurrencyDto} from "./dto/response.currency.dto";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'arquitectura';
  currencyForm: FormGroup;
  responseCurrencyDto: ResponseCurrencyDto;

  constructor(private formbuilder: FormBuilder, private currencyService: CurrencyService) {
    this.currencyForm = this.formbuilder.group({
      from: '',
      to: '',
      amount: ''
    })
  }

  submit() {
    console.log(this.currencyForm.value);
    this.currencyService.convertCurrency(this.currencyForm.value.to, this.currencyForm.value.from, this.currencyForm.value.amount).subscribe(
      {
        next: (data) => {
          console.log("Success");
          console.log(data);
          this.responseCurrencyDto = data;
          console.log("Result:");
          console.log(this.responseCurrencyDto.result);
        },
        error: (error) => console.log("Error:", error)
      }
    );
    console.log("Testing API");
    //console.log(this.currencyService.convertCurrency(this.currencyForm.value.to, this.currencyForm.value.from, this.currencyForm.value.amount))
  }
}
