import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaleht',
  templateUrl: './avaleht.component.html',
  styleUrls: ['./avaleht.component.css']
})
export class AvalehtComponent implements OnInit {

  // localStorage/sessionStorage
  // fail
  // andmebaas

  tooted: any[] = [
    // {nimi: 'Coca cola', hind: 1, aktiivne: true}, 
    // {nimi: 'Fanta', hind: 1.5, aktiivne: true}, 
    // {nimi: 'Srpite', hind: 1, aktiivne: true},
    // {nimi: 'Vichy', hind: 2, aktiivne: false}, 
    // {nimi: 'Vitamine well', hind: 2.5, aktiivne: true}
    ];

  kahendV22rtus = true; // boolean
  kahendV22rtusKaks = false; // boolean

  // string
  s6nalineMuutuja = "jutumärkide sees mingi sõna või lause või täht";

  // number
  numbrilineMuutuja = 31312;

  constructor(private http: HttpClient) { 
    console.log("kui Component ehitatakse valmis siis pannakse esimene constructor käima");
    console.log("constructori sisse pannakse ühendusi erinevate failidega");
  }

  ngOnInit(): void {
    console.log("AvalehtComponent käimaminemise funktsioon -  see läheb");
    console.log("käima siis, kui kasutaja läheb siia componendi peale ja");
    console.log("HTML käivitub, aga ngOnInit funktsioon läheb käima vahetult enne HTMLi");
    // const tootedLocalStoragest = localStorage.getItem("tooted");
    // if (tootedLocalStoragest) {
    //   this.tooted = JSON.parse(tootedLocalStoragest);
    //   console.log(this.tooted);
    // }
    this.http.get<any>(
      "https://angular-01-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
      .subscribe(tagastus => {
        const uusMassiiv = [];
        for (const key in tagastus) {
          uusMassiiv.push(tagastus[key]);
        }
        this.tooted = uusMassiiv;
      });
  }

              // a) "fanta"
              // b) "sprite"
  onLisaOstukorvi(toode: any) {
    // ["coca cola"]
    // parem klõps -> inspect -> application -> session storage
    // a) sessionStorageOstukorv = null;
    // b) sessionStorageOstukorv = "["fanta"]";
    const sessionStorageOstukorv = sessionStorage.getItem("ostukorv");
    if (sessionStorageOstukorv) {
      //1. võta see mis sul juba sessionStorages selle võtme on
      //2. lisa sinna see toode juurde
      //3. pane see uuesti sessionStoragesse
                    //"["fanta"]" -> ["fanta"]
      const ostukorviTooted = JSON.parse(sessionStorageOstukorv);
      // ["fanta"].push("sprite")
      // ["fanta", "sprite"]
      ostukorviTooted.push(toode);
                                          //"["fanta", "sprite"]"
                          // key = ostukorv |  value = "["fanta", "sprite"]"              
      sessionStorage.setItem("ostukorv", JSON.stringify(ostukorviTooted));
    } else {
                                           //           "["fanta"]"
                      // key = ostukorv |  value = "["fanta"]"
      sessionStorage.setItem("ostukorv", JSON.stringify([toode]));
    }
  }

  //10.45

}
