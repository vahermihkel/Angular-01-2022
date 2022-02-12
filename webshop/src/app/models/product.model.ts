export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public imgSrc: string,
    public description: string,
    public category: string,
    public isActive: boolean, 
  ) {}
}

// any vs tüüp
// Õige asjad läheksid õigete kohtade peale
// ja kui ei lähe, siis annab juba koheselt errori

// Any korral võib see viga välja tulla tunduvalt
// hiljem

// kodustes projektides - võin any hoida
// ettevõtetes lähevad projektid väga suureks
// vähemalt 2 aastat, vähemalt 3 inimest
// 8h päevas
// kindlasti tüüp, sest ei pruugi olla minu kood
// orienteerumine koodis on raskem
// tüübid aitavad orienteeruda ja kiiresti vigu leida

// MIKS MODEL? miks mitte componendis otse
// 1. lühendamine - kui on 20 erinevat võti-väärtus paari
// , siis lähevad failid väga pikaks
// 2. ühe muutuse, siis läheb kõikjale korraga
// 3. näen ühe pilguga ära, mis tüüp on