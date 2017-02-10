export class Hero {
  _id:string;
  _rev:string;
  name:string;
  universe:string;
  city:string;
  country:string;
  powers:string;
  
  constructor(value:Object = {}){
    Object.assign(this, value);
  }
}
