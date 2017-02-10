import { Component } from '@angular/core';
import {Hero} from './hero';
import {HeroServiceService} from './hero-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HeroServiceService]
})
export class AppComponent {
  title = 'Tour of Heroes!';
}
