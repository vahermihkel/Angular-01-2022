import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class IdUniquenessService {

  constructor() { }

  onCheckIdUniqueness(idEntered: number, 
      products: Product[], product?: Product): boolean {
      let productId = null;
      if (product) {
        productId = product.id;
      }
      const index = products.findIndex(element => 
              element.id === idEntered);
      if (index === -1 || productId === idEntered) {
        return false;
      } else {
        return true;
      }
  }
}
