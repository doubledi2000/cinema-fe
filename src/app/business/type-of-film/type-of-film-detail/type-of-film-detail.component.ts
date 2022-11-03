import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { STATUS } from 'src/app/shared/constant/status.constant';
import { LENGTH_VALIDATOR, VALIDATORS } from 'src/app/shared/constant/validators.constant';
import { ITypeOfFilm, TypeOfFilm } from 'src/app/shared/model/type-of-film.model';
import { TypeOfFilmService } from 'src/app/shared/service/type-of-film.service';
import CommonUtil from 'src/app/shared/utils/common-util';

@Component({
  selector: 'app-type-of-film-detail',
  templateUrl: './type-of-film-detail.component.html',
  styleUrls: ['./type-of-film-detail.component.scss']
})
export class TypeOfFilmDetailComponent implements OnInit {

  @Input() typeOfFilm: TypeOfFilm = new TypeOfFilm();

  isDetail = window.location.href.includes('detail');
  isUpdate = window.location.href.includes('update');
  isCreate = window.location.href.includes('create');
  typeOfFilmDetail :ITypeOfFilm = new TypeOfFilm();
  typeOfFilmId = '';
  isEdit = false;
  form: FormGroup = new FormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  STATUS = STATUS;

  constructor(
    private typeOfFilmService: TypeOfFilmService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    console.log(this.form.value);
  }

  getUrlParam(){
    this.activatedRoute.params.subscribe((params) => {
      if (params?.id) {
        this.typeOfFilmId = params.id;
        this.isEdit = true;
        this.getTypeOfFilmById(this.typeOfFilmId || '');
      }
    });
  }

  getTypeOfFilmById(id: string){
    this.typeOfFilmService.getById(id).subscribe(response=>{
      this.typeOfFilmDetail = response?.data as ITypeOfFilm;
    } )
  }

  initForm(){
    if(this.isCreate) {
      this.typeOfFilm = {};
    }
    this.form = this.fb.group({
      code: [
        {
          value: this.typeOfFilm.code,
          disabled: !this.isCreate ? true : false
        },
        [Validators.required, Validators.pattern(VALIDATORS.CODE)]
      ],
      name: [
        {
          value: this.typeOfFilm.name,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      description: [
        {
          value: this.typeOfFilm.description,
          disabled: this.isDetail ? true : false
        }
      ]
    })
  }

  onSubmit(): void{
    if(this.isCreate) {
      this.create();
    }else{
      this.update()
    }
  }

  create(){
    const body = CommonUtil.trim({
      ...this.form.value
    });
    this.typeOfFilmService.create(body).subscribe(data => {
      if(data && data.code == STATUS.SUCCESS_200) {
        this.toast.success('');
        this.modalRef.close({
          success: true,
          value: data?.data as ITypeOfFilm
        })
      }else {
        this.toast.error(`${data.message}`);
        this.modalRef.close({
          success: false,
          value: null
        })
      }
    })
  }
  update(){
    this.form.enable();
    const body = CommonUtil.trim({
      ...this.form.value
    })
    if(this.typeOfFilm.id) {
      this.typeOfFilmService.update(this.typeOfFilm.id, body).subscribe(data=>{
        if(data.code == STATUS.SUCCESS_200) {
            this.toast.success('Cập nhật thể loại phim thành công');
            this.modalRef.close({
              success: true,
              value: data?.data as ITypeOfFilm
            })
        }else{
          this.toast.error(`${data.message}`);
        }
      })
    }
  }

  onCancel(){
    this.modalRef.close({success: false, value: null})
  }

  nextToUpdate(){
    this.isDetail = false;
    this.isUpdate = true;
    this.form.controls.name.enable();
    this.form.controls.description.enable();
  }
}
