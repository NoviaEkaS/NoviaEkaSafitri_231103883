import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { HttpClient } from '@angular/common/http';
import { formatCurrency } from '@angular/common';

declare const $ : any;

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [ Footer, Header, Sidebar ],
  templateUrl: './forex.html',
  styleUrl: './forex.css',
})
export class Forex implements AfterViewInit {
  private _table1 : any;

  constructor(private renderer: Renderer2, private httpClient: HttpClient) {}

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapsed");

    this._table1 = $("#table1").DataTable({
      "columnDefs": [
        {
          "targets" : 3,
          "className" : "text-right"
        }
      ]
    });

    this.bindTable1();
  }

  bindTable1(): void {
    console.log("bindTable()");

    // URL to fetch exchange rates
    const ratesUrl = "https://openexchangerates.org/api/latest.json?app_id=96d92047f1ef44e5a567ffd978bc38e3";

    // URL to fetch currency names
    const currenciesUrl = "https://openexchangerates.org/api/currencies.json";

    // fetch the cureency names
    this.httpClient.get(currenciesUrl).subscribe((currencies: any) => {
      // fetch the exchange rates
      this.httpClient.get(ratesUrl).subscribe((data: any) => {
        $("#tanggal").html("Data per tanggal " + this.formatDate(new Date(data.timestamp * 1000)));
        const rates = data.rates;
        let index = 1;

        // iterate over the rates and add the rows to the table
        for (const currency in rates) {
          // get the currency name from the API
          const currencyName = currencies[currency];

          // claculate the rate for the specific currency
          const rate = rates.IDR / rates[currency];
          const formatRate = formatCurrency(rate, "en-us", "", currency);

          console.log('${currency}: ${currencyName} - ${formatRate}');

          // add the row with the index, symbol, currency name, and formatted rate
          const row = [index++, currency, currencyName, formatRate];
          this._table1.row.add(row);
        }

        this._table1.draw(false);
      });
    });
  }
}
