import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroServiceService } from '../hero-service.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:Hero[];
  selectedHero:Hero;
  newHero:Hero = new Hero();

  constructor(private heroService:HeroServiceService, private router:Router) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes():void{
    this.heroService.getHeroes().then(heroes=>this.heroes = heroes);
  }

  onSelect(hero):void {
    this.selectedHero = hero;
  }
  gotoDetail():void {
    this.router.navigate(['/heroes', this.selectedHero._id]);
  }

  add(hero: Hero): void {
    if(!this.validateHero){
      return;
    } 
    else{
      this.heroService.create(hero)
        .then(() => {
          this.getHeroes();
          this.selectedHero = null;
          this.newHero = new Hero();
      });
  }
  
  }
  private validateHero(hero:Hero):Boolean{
    if(!hero.name || !hero.universe){
      return false;
    }
    return true;
  }
}
