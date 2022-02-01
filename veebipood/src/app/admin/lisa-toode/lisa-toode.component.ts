import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lisa-toode',
  templateUrl: './lisa-toode.component.html',
  styleUrls: ['./lisa-toode.component.css']
})
export class LisaToodeComponent implements OnInit {

  constructor() { }

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
      const tootedLocalStoragest = localStorage.getItem("tooted");
      if (tootedLocalStoragest) { //  !== null kontrollib kas on tühjus või midagi sees
        const tooted = JSON.parse(tootedLocalStoragest);
        tooted.push(vorm.value);
        localStorage.setItem("tooted", JSON.stringify(tooted));
      } else {
        localStorage.setItem("tooted", JSON.stringify([vorm.value]));
      }
    }
  }

}
