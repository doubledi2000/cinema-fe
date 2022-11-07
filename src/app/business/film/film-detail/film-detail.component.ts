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
import { ActivatedRoute, Router } from '@angular/router';
import CommonUtil from '../../../shared/utils/common-util';
import { ToastrService } from 'ngx-toastr';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.activatedRoute.paramMap.subscribe( params => {
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
      producerIds: [
        {
          value: this.film.producerIds || [],
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      directors: [
        {
          value: this.film.directors,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      actors: [
        {
          value: this.film.actors,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ]
  })
  }

  async getFiles(files: any): Promise<void> {
    if (files) {
      this.files = files[0];
      getBase64(files[0]).then((data) => {
        this.imageUrl = data;
      });
    }
  }
  onCancel(){
    this.router.navigateByUrl(`/business/film`);

  }

  nextToUpdate(){
    // this.isDetail = false;
    // this.isUpdate = true;
    // this.initForm();
    // this.form.controls.filmTypeIds.enable();
    // console.log(this.form)
    this.router.navigateByUrl(`/business/film/${this.film.id}/update`);
  }

  onSubmit(){
    if(this.isCreate) {
      this.create();
    } else {
      this.update();
    }
  }

  loadFilm(){
    if(!this.isCreate) {
      this.filmService.getById(this.filmId || '').subscribe(response=>{
        if(response.success) {
          this.film = response.data as IFilm;
        }
       this.initForm();
      })
    }
  }

  create(){
    const body = CommonUtil.trim({
      ...this.form.value
    });
    this.filmService.create(body).subscribe(response =>{
      if(response.success) {
        this.film = response.data as IFilm;
        this.router.navigateByUrl(`/business/film/${this.film.id}/update`);
        this.toastr.success('Thêm mới phim thành công');
      }
    })
  }

  update(){
    const body = CommonUtil.trim({
      ...this.form.value
    });
    this.filmService.update(this.film.id, body).subscribe(response =>{
      if(response.success) {
        this.film = response.data as IFilm;
        this.toastr.success('Cập nhập phim thành công');

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
