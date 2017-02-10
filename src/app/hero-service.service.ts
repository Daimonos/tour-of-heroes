import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HeroServiceService {
  private apiUrl:string = 'http://localhost:5984/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  getHeroes():Promise<Hero[]> {
    return this.http.get(this.apiUrl+'/_all_docs?include_docs=true')
      .toPromise()
      .then((response)=>{return this.mapResponse(response)})
      .catch(this.handleError);
  }
  getHero(id:string):Promise<Hero>{
    return this.http.get(this.apiUrl+'/'+id)
      .toPromise()
      .then(response=>response.json() as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.apiUrl}/${hero._id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then((response) =>{console.log(response.json())})
      .catch(this.handleError);
  }

  create(hero:string):Promise<Hero>{
    console.log(hero);
    let newHero = new Hero({name:hero});
    return this.http.post(this.apiUrl, JSON.stringify(newHero), {headers:this.headers})
      .toPromise()
      .then(function(response){
        return "OK";
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  private mapResponse(response:Response):Hero[]{
    return response.json().rows.map(this.extractDocFromArray);
  }
  private extractDocFromArray(r:any):Hero {
    console.log(r);
    let hero = <Hero>(r.doc);
    return hero;
  }

}
