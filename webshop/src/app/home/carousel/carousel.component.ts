import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  // images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images = [
    "https://picsum.photos/id/700/900/500",
    "https://picsum.photos/id/533/900/500",
    "https://picsum.photos/id/807/900/500",
    "https://picsum.photos/id/124/900/500",
  ];

  // 1. ngFor kujule
  // 2. Objektideks - URL, header, text, alt
  // header1, header2, header3
  // text1, text2, text3
  // alt1, alt2, alt3

  constructor() { }

  ngOnInit(): void {
  }

}
