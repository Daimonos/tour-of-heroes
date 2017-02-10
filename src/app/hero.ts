export class Hero {
  _id:string;
  _rev:string;
  name:string;
  universe:string;
  
  constructor(value:Object = {}){
    Object.assign(this, value);
  }
}
