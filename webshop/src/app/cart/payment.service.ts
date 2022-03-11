import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url = "";
  private headers = {};

  constructor(private http: HttpClient) { }

  makePayment(totalSum: number) {
    const data = {

    }
    return this.http.post(this.url, data, this.headers);
  }
}
