import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaata-tooteid',
  templateUrl: './vaata-tooteid.component.html',
  styleUrls: ['./vaata-tooteid.component.css']
})
export class VaataTooteidComponent implements OnInit {

  tooted: any[] = [
    // {nimi: 'Coca cola', hind: 1, aktiivne: true}, 
    // {nimi: 'Fanta', hind: 1.5, aktiivne: true}, 
    // {nimi: 'Srpite', hind: 1, aktiivne: true},
    // {nimi: 'Vichy', hind: 2, aktiivne: false}, 
    // {nimi: 'Vitamine well', hind: 2.5, aktiivne: true}
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // const tootedLocalStoragest = localStorage.getItem("tooted");
    // if (tootedLocalStoragest) {
    //   this.tooted = JSON.parse(tootedLocalStoragest);
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

  onKustutaToode(kustutatavToode: any) {
    const j2rjekorraNumber = this.tooted.indexOf(kustutatavToode);
    this.tooted.splice(j2rjekorraNumber, 1);
    // localStorage.setItem("tooted", JSON.stringify(this.tooted));
    this.http.put("https://angular-01-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json",
            this.tooted).subscribe();
  }

}
