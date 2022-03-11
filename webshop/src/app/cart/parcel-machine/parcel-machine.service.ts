import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParcelMachine } from 'src/app/models/parcel-machine.model';

@Injectable({
  providedIn: 'root'
})
export class ParcelMachineService {
  private url = "https://www.omniva.ee/locations.json";

  constructor(private http: HttpClient) { }

  getParcelMachines() {
    return this.http.get<ParcelMachine[]>(this.url);
  }

}
