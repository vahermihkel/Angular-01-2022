import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(value: any[] | Product[], mapKey: string): string[] {
    const newArray = value.map(element => element[mapKey]);
    // return newArray.filter((element, index, values) => values.indexOf(element) === index);
    return [...new Set(newArray)];
  }

  // .find(element => true) --  tagastab esimese kellel on true ühe elemendina
  // .map(element => "uus väärtus") -- tagastab TÄPSELT SAMA PALJU elemente selle uue väärtusega

  // [{ZIP:123, asd:13asd, asdad:3123, A1_NAME: "Vilj"},{ZIP:333, asd:13asd, asdad:3123, A1_NAME: "Vilj"}]
  // ["Vilj", "Vilj", "Tartu", "Tallinn", "Tartu", "Vilj"]

  // .filter(element => true) -- tagastab kõik kellel on true uue massiivina
  // [3,123,31,44].indexOf(31) --- tagastab numbri millisel järjekorranumbril asetub 2

  // ["Vilj", "Vilj", "Tartu", "Tallinn", "Tartu", "Vilj"] - [list]
  // .filter(("Vilj",0,[list])=> [list].indexOf("Vilj") === 0 )
  // .filter(("Vilj",1,[list])=> [list].indexOf("Vilj") === 1 ) --- false
  // .filter(("Tartu",2,[list])=> [list].indexOf("Tart") === 2 )
  // .filter(("Tal",3,[list])=> [list].indexOf("Tal") === 3 )
  // .filter(("Tartu",4,[list])=> 2 === 4 ) --- false
  // .filter(("Vilj",5,[list])=> 0 === 5 ) --- false
}
