import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lisa-toode',
  templateUrl: './lisa-toode.component.html',
  styleUrls: ['./lisa-toode.component.css']
})
export class LisaToodeComponent implements OnInit {

  // erinevate failide ühendamiseks selle componendiga
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onLisa(vorm: any) {
    // {touched: true, untouched: false, controls: [], valid: true, invalid: false, value: {}}
    console.log(vorm);
    if (vorm.valid) { //  === true kas see on true / false muutuja 
      if (vorm.value.aktiivne === '') { // kas on tõene avaldis
        vorm.value.aktiivne = false;
      }
      console.log(vorm.value);
            // [{nimi: 'Mihkel Vaher', hind: 50, aktiivne: ''}]
      // const tootedLocalStoragest = localStorage.getItem("tooted");
      // if (tootedLocalStoragest) { //  !== null kontrollib kas on tühjus või midagi sees
      //   const tooted = JSON.parse(tootedLocalStoragest);
      //   tooted.push(vorm.value);
      //   localStorage.setItem("tooted", JSON.stringify(tooted));
      // } else {
      //             // [{nim: "", hind: 2}]
      //   localStorage.setItem("tooted", JSON.stringify([vorm.value]));
      // }
      this.http.post("https://angular-01-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json",
            vorm.value).subscribe();
    }
  }

}
