import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LENGTH_VALIDATOR } from '../../../shared/constant/validators.constant';
import { IFilm, Film } from '../../../shared/model/film.model';
import { FILM_STATUS_LIST } from '../../../shared/constant/film-status.constant';
import { ITypeOfFilm } from '../../../shared/model/type-of-film.model';
import { Producer, IProducer } from '../../../shared/model/producer.model';
import { TypeOfFilmService } from '../../../shared/service/type-of-film.service';
import { ProducerService } from '../../../shared/service/producer.service';
import { FilmService } from '../../../shared/service/film.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  LENGTH_VALIDATOR= LENGTH_VALIDATOR;
  isDetail = window.location.href.includes('detail');
  isUpdate = window.location.href.includes('update');
  isCreate = window.location.href.includes('create');
  FILM_STATUS_LIST = FILM_STATUS_LIST;

  form: FormGroup = new FormGroup({});
  filmId: string = '';
  files: [] | any;
  imageUrl?: any;
  film: IFilm = new Film();
  typeOfFilmList: ITypeOfFilm[] = [];
  producerList: IProducer[] = [];

  constructor(
    private fb: FormBuilder,
    private typeOfFilmService: TypeOfFilmService,
    private producerService: ProducerService,
    private filmService: FilmService,
    private router: ActivatedRoute
  ) {
    this.router.paramMap.subscribe( params => {
      this.filmId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.loadProducer();
    this.loadTypeOfFilm();
    this.loadFilm();
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      id: [
          this.film.id
      ],
      code: [
        {
          value: this.film.code,
          disabled: !this.isCreate ? true : false
        },
        [Validators.required]
      ],
      name: [
        {
          value: this.film.name,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      allowedAgeFrom: [
        {
          value: this.film.allowedAgeFrom || 1,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      status: [
        {
          value: this.film.status,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      ownershipDate: [
        {
          value: this.film.ownershipDate  ? new Date(this.film.ownershipDate[0],this.film.ownershipDate[1],this.film.ownershipDate[2]) : this.film.ownershipDate,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      releaseDate: [
        {
          value: this.film.releaseDate ? new Date(this.film.releaseDate[0],this.film.releaseDate[1],this.film.releaseDate[2]) : this.film.releaseDate,
          disabled: this.isDetail ? true: false
        },
        [Validators.required]
      ],
      filmTypeIds: [
        {
          value: this.film.filmTypeIds || [],
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      description: [
        {
          value: this.film.description,
          disabled: this.isDetail ? true : false
        }
      ],
      duration: [
        {
          value: this.film.duration || 1,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      producerId: [
        {
          value: this.film.producerId,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ]
  })
  console.log(this.film)
  }

  async getFiles(files: any): Promise<void> {
    if (files) {
      this.files = files[0];
      console.log(this.files)
      getBase64(files[0]).then((data) => {
        this.imageUrl = data;
      });
    }
  }
  onCancel(){

  }

  nextToUpdate(){

  }

  onSubmit(){
    if(this.isCreate) {
      this.create();
    }
  }

  loadFilm(){
    if(!this.isCreate) {
      this.filmService.getById(this.filmId || '').subscribe(response=>{
        if(response.success) {
          this.film = response.data as IFilm;
          console.log(response)
        }
       this.initForm();
      })
    }
  }

  create(){
    const body = {
      ...this.form.value
    }
    this.filmService.create(body).subscribe(response =>{
      if(response.success) {
        this.film = response.data as IFilm;
      }
    })
  }

  loadTypeOfFilm(){
    this.typeOfFilmService.autoComplete({}).subscribe(response => {
      if(response.success) {
        this.typeOfFilmList = response.data as ITypeOfFilm[];
      }
    })
  }

  loadProducer(){
    this.producerService.autoComplete({}).subscribe(response =>{
      if(response.success) {
        this.producerList = response.data as IProducer[];
      }
    })
  }
}
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
