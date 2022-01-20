import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaleht',
  templateUrl: './avaleht.component.html',
  styleUrls: ['./avaleht.component.css']
})
export class AvalehtComponent implements OnInit {
  kahendV22rtus = true; // boolean
  kahendV22rtusKaks = false; // boolean

  // string
  s6nalineMuutuja = "jutumärkide sees mingi sõna või lause või täht";

  // number
  numbrilineMuutuja = 31312;

  constructor() { 
    console.log("kui Component ehitatakse valmis siis pannakse esimene constructor käima");
    console.log("constructori sisse pannakse ühendusi erinevate failidega");
  }

  ngOnInit(): void {
    console.log("AvalehtComponent käimaminemise funktsioon -  see läheb");
    console.log("käima siis, kui kasutaja läheb siia componendi peale ja");
    console.log("HTML käivitub, aga ngOnInit funktsioon läheb käima vahetult enne HTMLi");
  }

  onLisaOstukorvi() {
    console.log("ostukorvi lisamise funktsionaalsus töötab!");
    this.kahendV22rtus = !this.kahendV22rtus;
    this.kahendV22rtusKaks = !this.kahendV22rtusKaks;
    // this.numbrilineMuutuja = !this.numbrilineMuutuja;
  }

}
