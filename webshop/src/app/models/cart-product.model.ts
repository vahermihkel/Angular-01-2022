import { Product } from "./product.model";

export class CartProduct {
  constructor(
    public cartProduct: Product,
    public quantity: number
  ) {}
}


//{cartProduct:{name:"A", price: 5},quantity:1}