import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ostukorv',
  templateUrl: './ostukorv.component.html',
  styleUrls: ['./ostukorv.component.css']
})
export class OstukorvComponent implements OnInit {
  toodeNimi = "Coca coca";
  toodeHind = 1;
  toodeAktiivne = false;

  toodeNimi2 = "Fanta";
  toodeHind2 = 1.5;
  toodeAktiivne2 = true;

  // JSON kuju

  constructor() { 
    console.log("constructor läheb käima");
  }

  ngOnInit(): void {
    console.log("mindi OstukorvComponent lehele");
  }

  onEemaldaOstukorvist() {
    console.log("eemaldatud ostukorvist");
  }

}
