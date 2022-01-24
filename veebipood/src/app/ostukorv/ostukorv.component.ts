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

  tooted = [
    {nimi: 'Coca cola', hind: 1, aktiivne: true}, 
    {nimi: 'Fanta', hind: 1.5, aktiivne: true}, 
    {nimi: 'Srpite', hind: 1, aktiivne: true},
    {nimi: 'Vichy', hind: 2, aktiivne: false}, 
    {nimi: 'Vitamine well', hind: 2.5, aktiivne: true}
    ];

  ostukorviSumma = 0;

  // JSON kuju

  constructor() { 
    console.log("constructor läheb käima");
  }

  ngOnInit(): void {
    console.log("mindi OstukorvComponent lehele");
    this.arvutaOstukorviSumma();
  }

  onTyhjendaOstukorv() {
    this.tooted = [];
    this.arvutaOstukorviSumma();
  }

  onLisaOstukorvi(toode: any) {
    console.log("lisatud ostukorvi");
    console.log(toode);
    console.log(this.tooted);
    this.tooted.push(toode);
    console.log(this.tooted);
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
    this.tooted.forEach(element => this.ostukorviSumma = this.ostukorviSumma + element.hind );
    console.log(this.ostukorviSumma);
  }

}
