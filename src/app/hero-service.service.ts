import { Injectable, OnInit } from '@angular/core';
import { Hero } from './hero';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HeroServiceService implements OnInit {
  private apiUrl:string = 'http://localhost:5984/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  ngOnInit(){
    console.log('Hero Service On Init');
    this.checkDatabase();
  }

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
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then((response) =>{console.log(response.json())})
      .catch(this.handleError);
  }

  create(hero:Hero):Promise<Hero>{
    console.log(hero);
    return this.http.post(this.apiUrl, JSON.stringify(hero), {headers:this.headers})
      .toPromise()
      .then(function(response){
        return "OK";
      })
      .catch(this.handleError);
  }

  private checkDatabase(){
    console.log('Checking Database Connection');
    this.http.get(this.apiUrl)
    .toPromise()
    .then(function(response){
      console.log('Database Connection Successful');
      console.log(response);
    })
    .catch((response)=>{
      console.log('Database Not Found');
      if(response.status === '404'){
        this.http.put(this.apiUrl, null)
        .toPromise()
        .then((response)=>{
          console.log(response);
        })
      }
    });
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
