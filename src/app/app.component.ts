import { Component, OnInit } from '@angular/core';
import { FilmService } from './shared/service/film.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  constructor(private filmService: FilmService){

  }

  ngOnInit(): void {
      this.filmService.getById('6d353202-a988-4bdd-9125-0b8f62846980').subscribe(data => {
        console.log(data);
      })
  }
}
