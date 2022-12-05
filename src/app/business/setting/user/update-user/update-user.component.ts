import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ILocation } from '../../../../shared/model/location.model';
import { IUser, User } from '../../../../shared/model/user.model';
import { LocationService } from '../../../../shared/service/location.service';
import { UserService } from '../../../../shared/service/user.service';
import { FileService } from '../../../../shared/service/file.service';
import { IRole } from '../../../../shared/model/role.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  isDetail = window.location.href.includes('detail');
  isUpdate = window.location.href.includes('update');
  isCreate = window.location.href.includes('create');
  files: [] | any;
  imageUrl?: any;
  form: FormGroup = new FormGroup({});
  locationList: ILocation[] = [];
  user: IUser = new User();
  userId: string = '';
  roles: IRole[] = [];
  locations: ILocation[] = [];


  constructor(
    private userService: UserService,
    private toastrSerice: ToastrService,
    private locationService: LocationService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService
  ) {
    this.activatedRoute.paramMap.subscribe( params => {
      this.userId = params.get('id');
    });
   }

  ngOnInit(): void {
    this.initForm();
    this.loadLocation();
    this.loadUser();
  }

  loadUser(){
    this.userService.getById(this.userId).subscribe(res =>{
      this.user = res.data as IUser;
      this.initForm();
      this.imageUrl = this.user.viewAvatarUrl;
    })
  }

  initForm(){
    this.form = this.fb.group({
      id: [
        this.user.id || ''
      ],
      username: [
        this.user.username || ''
      ],
      password: [
        this.user.password || ''

      ],
      fullName: [
        this.user.fullName || ''
      ],
      email: [
        this.user.email || ''
      ],
      phoneNumber: [
        this.user.phoneNumber || ''
      ],
      dayOfBirth: [
        this.user.dayOfBirth || new Date()
      ],
      gender: [
        this.user.gender || ''
      ],
      employeeCode: [
        this.user.employeeCode ||''
      ],
      title: [
        this.user.title ||''
      ],
      departmentName: [
        this.user.departmentName || ''
      ],
      description: [
        this.user.description || ''
      ],
      status: [
        this.user.status || ''
      ],
      locationIds: [
        []
      ],
      roleIds:[
        this.user.roleIds || []
      ]
    })
  }

  async getFiles(files: any): Promise<void> {
    if (files) {
      this.files = files[0];
      getBase64(files[0]).then((data) => {
        this.imageUrl = data;
      });
      this.fileService.upload(files[0]).subscribe(res=>{
        if(res && res.success) {
          this.imageUrl = res.data.path;
        }
      })
    }
  }

  loadLocation(){
    this.locationService.autoComplete({}).subscribe(resposne => {
      this.locationList = resposne.data as ILocation[];
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
