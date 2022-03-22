import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit, AfterViewInit {
  private map: any;
  private centerX = 59.42;
  private centerY = 24.75;
  private zoom = 12;
  private marker: any;
  private marker2: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.centerX , this.centerY ],
      zoom: this.zoom
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.marker = L.marker([59.42199366050282, 24.79382408259017]);
    this.marker.addTo(this.map);

    this.marker2 = L.marker([59.42770602986127, 24.722799945414504]);
    this.marker2.addTo(this.map);

  }

  constructor() { }

  ngOnInit(): void { // enne HTMLi
  }

  ngAfterViewInit(): void { 
    this.initMap();
  } // pärast HTMLi läheb käima

  onZoom(x:number, y:number,  zoom:number, pood: string) {
    this.map.setView(L.latLng([x,y]),zoom);
    this.marker.bindPopup().closePopup()
    this.marker2.bindPopup().closePopup();
    if (pood === "Ülemiste") {
      this.marker.bindPopup("<b>Ülemiste kauplus</b><br>E-R 9.00-22.00<br>L-P 10.00-22.00").openPopup();
    } else if (pood === "Kristiine") {
      this.marker2.bindPopup("<b>Kristiine kauplus</b><br>E-R 9.00-22.00<br>L-P 10.00-22.00").openPopup();
    } 
  }

}
