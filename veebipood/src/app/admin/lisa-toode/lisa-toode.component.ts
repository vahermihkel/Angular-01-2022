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
    console.log(vorm);
    if (vorm.valid) {
      console.log(vorm.value);
    }
  }

}
