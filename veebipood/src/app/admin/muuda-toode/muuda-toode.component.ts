import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-muuda-toode',
  templateUrl: './muuda-toode.component.html',
  styleUrls: ['./muuda-toode.component.css']
})
export class MuudaToodeComponent implements OnInit {

  private tooted!: any[]; // kahes erinevas funktsioonis
  private tooteId!: any; // kahes erinevas funktsioonis
  tooteMuutmiseVorm!: FormGroup; // HTML-s kuvame siis näitame

            // andmebaasist toodete võtmiseks
            // andmebaasi pärast muutmist toodete asendamiseks
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // "suur-olle"
    const tooteNimi = window.location.href.split("muuda/")[1];

    this.http.get<any>(
      "https://angular-01-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
      .subscribe(tagastus => {
        // tagastus = {{-masdad213asd: {1...}},{-addasdas231: {2...}},{-ad1231asd23: {3...}}}
        const uusMassiiv = [];
        for (const key in tagastus) { // key: 1.-masdad213asd 2.-addasdas231 3.-ad1231asd23
          uusMassiiv.push(tagastus[key]); //[].push({1...}) -> [{1...}].push({2...}) -> [{1...},{2...}].push({3...})
        }
        this.tooted = uusMassiiv; // [{1...},{2...},{3...}]
        // [{1...},{nimi:"Suur Õlle",hind:2...},{nimi:"Suur õlle",hind:3...}].find();
        // .find({"1"...}=> "1" === "suur-olle")
        // .find({nimi:"Suur Õlle",hind:2...}=> "suur-olle" === "suur-olle")
        const toode = this.tooted.find(element => // {nimi:"Suur Õlle",hind:2...}
          element.nimi.toLowerCase().replace(' ', '-').replace('õ','o') === tooteNimi);
        // [{1...},{nimi:"Suur Õlle",hind:2...},{nimi:"Suur õlle",hind:3...}].indexOf({nimi:"Suur Õlle",hind:2...})
        // tooteId = 1;
        this.tooteId = this.tooted.indexOf(toode);


        this.tooteMuutmiseVorm = new FormGroup({ // saab kõik vajalikud omadused kaasa
          nimi: new FormControl(toode.nimi), // vasakpoolne võti leiab matchi HTML-s
          hind: new FormControl(toode.hind), // parempool saab new FormControl abil kõik vajalikud omadused kaasa
          aktiivne: new FormControl(toode.aktiivne) // sulgude sees saab väärtuse tootest keda me leidsime
        })  // {nimi:"Suur Õlle",hind:2...}  --> .nimi === "Suur Õlle"  .hind === 2
      });
  }

  onMuuda() {
    // [{1...},{nimi:"Suur Õlle",hind:2...},{nimi:"Suur õlle",hind:3...}]
    // tooteId = 1
    // this.tooted[1] = { nimi: "Suur Kali", hind: 2,.... }
    this.tooted[this.tooteId] = this.tooteMuutmiseVorm.value;
    this.http.put("https://angular-01-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json",
            this.tooted).subscribe();
  }

}
