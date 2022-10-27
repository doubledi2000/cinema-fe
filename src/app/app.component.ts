import { Component, OnInit } from '@angular/core';
import { FilmService } from './shared/service/film.service';
import { LoaderService } from './shared/service/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  constructor(private filmService: FilmService,
      public loaderSerive: LoaderService
    ){

  }

  ngOnInit(): void {
      const params = {
        keyword:'HOR',
        pageIndex: 1,
        pageSize: 30
      };
      this.filmService.search(params).subscribe(data => {
        console.log(data);
      })
  }
}
