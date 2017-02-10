import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Hero } from '../hero';
import { HeroServiceService } from '../hero-service.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  hero:Hero;

  constructor(
    private heroService:HeroServiceService,
    private route:ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.heroService.getHero(params['id']))
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.heroService.update(this.hero).then(()=>this.location.back());
  }

}
