import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ostukorv',
  templateUrl: './ostukorv.component.html',
  styleUrls: ['./ostukorv.component.css']
})
export class OstukorvComponent implements OnInit {
  // toodeNimi = "Coca coca";
  // toodeHind = 1;
  // toodeAktiivne = false;
  // // JSON objekt
  // toode1 = {nimi: "Coca cola", hind: 1, aktiivne: false};

  // toodeNimi2 = "Fanta";
  // toodeHind2 = 1.5;
  // toodeAktiivne2 = true;

  tooted: any[] = [];

  ostukorviSumma = 0;

  // JSON kuju

  constructor(private http: HttpClient) { 
    console.log("constructor läheb käima");
  }

  ngOnInit(): void {
    console.log("mindi OstukorvComponent lehele");
            //      '[{nimi: "Coca cola", hind: 1, aktiivne: false}]'
    const ostukorviTooted = sessionStorage.getItem("ostukorv");
    if (ostukorviTooted) {
      //        [{nimi: "Coca cola", hind: 1, aktiivne: false}]
      this.tooted = JSON.parse(ostukorviTooted);
    }
    this.arvutaOstukorviSumma();
  }

  onTyhjendaOstukorv() {
    this.tooted = [];
    sessionStorage.setItem("ostukorv", JSON.stringify(this.tooted));
    this.arvutaOstukorviSumma();
  }

          // {nimi: "Fanta", hind: 1, aktiivne: false}
  onLisaOstukorvi(toode: any) {
    this.tooted.push(toode);
   // '[{nimi: "Coca cola", hind: 1, aktiivne: false},{nimi: "Fanta", hind: 1, aktiivne: false}]'
    sessionStorage.setItem("ostukorv", JSON.stringify(this.tooted));
    this.arvutaOstukorviSumma();
  }

                    // {name: "Coca", hind: 1, akt: true}
  onEemaldaOstukorvist(toode: any) {
    console.log("eemaldatud ostukorvist");
    console.log(toode);
                    ///         [].indexOf({name: "Coca", hind: 1, akt: true)
                    // const j2rjekorraNumber = 1; (teist elementi järjekorras)
    const j2rjekorraNumber = this.tooted.indexOf(toode);
    console.log(j2rjekorraNumber);
    console.log(this.tooted);
                  //    1,1 --- kustutatakse indexiga 1 kokku 1 element
    this.tooted.splice(j2rjekorraNumber, 1);
    console.log(this.tooted);
    sessionStorage.setItem("ostukorv", JSON.stringify(this.tooted));
    this.arvutaOstukorviSumma();
  }

  private arvutaOstukorviSumma() {
    //  *ngFor="let ELEMENT of ARRAY"
    // korrutatakse HTMLi nii palju kui on erinevaid elemente
  
    // ARRAY.forEach(ELEMENT => );
    // korrutatakse JavaScriptri koodilõiku nii palju kui on erinevaid elemente

    // [{name: "A", hind: 2}, {name: "B", hind: 5}, {name: "C", hind: 4}].forEach()
    // [].forEach({name: "A", hind: 2} => 2  = 0 + 2  )
    // [].forEach({name: "B", hind: 5} => 7  =  2 + 5  )
    // [].forEach({name: "C", hind: 4}} => 11 =  7 + 4  )
    this.ostukorviSumma = 0;
    //  *ngFor="let toode of tooted"
    // tooted.forEach(toode => console.log("toode") )
    this.tooted.forEach(element => this.ostukorviSumma = this.ostukorviSumma + element.hind );
    console.log(this.ostukorviSumma);

    // let uusMuutuja;
    // const uusMuutuja;

    // <div *ngFor="let element of this.tooted"></div>
  }

  mineMaksma() {
    const makseAndmed = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": this.ostukorviSumma,
      "order_reference": Math.floor(Math.random() * 899999 + 100000),
      "nonce": "92ddcfab96e34a5f" + Math.floor(Math.random() * 899999 + 100000) + new Date(),
      "timestamp": new Date(),
      "customer_url": "https://www.delfi.ee"
      }
    const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
      
    // let headers = new HttpHeaders();
    // headers.set("Authorization", "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==");
 
    this.http.post<any>(
      url,
      makseAndmed,
      {headers:
        new HttpHeaders(
          {
            'Authorization': 
            'Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=='
          }
        )
      }
    ).subscribe(response => window.location.href = response.payment_link );
    
  }

}
