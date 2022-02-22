import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordCount'
})
export class WordCountPipe implements PipeTransform {

  transform(value: string, wordCount: number): any {
    return value.split(" ").slice(0,wordCount).join(" ");
  }

  // "Elas metsas mutionu, keset kuuski".split(" ");
  // ["Elas", "metsas", "mutionu,", "keset", "kuuski"];

  // "Elas metsas mutionu, keset kuuski".split("a");
  // ["El", "s mets", "s mutionu, keset kuuski"];

  // .slice(1,3)
  // ["metsas", "mutionu,"]
  // ["s mets", "s mutionu, keset kuuski"]

  // join("::")
  // "metsas::mutionu"
  // "s mets::s mutionu, keset kuuski"
}
