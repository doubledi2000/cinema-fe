import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ILocation } from '../../../../shared/model/location.model';
import { IRole } from '../../../../shared/model/role.model';
import { IUser, User } from '../../../../shared/model/user.model';
import { FileService } from '../../../../shared/service/file.service';
import { LocationService } from '../../../../shared/service/location.service';
import { RoleService } from '../../../../shared/service/role.service';
import { UserService } from '../../../../shared/service/user.service';
import CommonUtil from '../../../../shared/utils/common-util';
import { GENDER } from '../../../../shared/constant/common.constant';
import { StorageService } from '../../../../shared/service/storage.service';

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
  genders = GENDER;
  fileId?: string = '';


  constructor(
    private userService: UserService,
    private toastrSerice: ToastrService,
    private locationService: LocationService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private roleService: RoleService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe( params => {
      this.userId = params.get('id');
    });
   }

  ngOnInit(): void {
    this.initForm();
    this.loadLocation();
    this.loadRole();
    if(!this.isCreate) {
      this.loadUser();
    }
  }

  loadUser(){
    this.userService.getById(this.userId).subscribe(res =>{
      this.user = res.data as IUser;
      this.initForm();
      this.imageUrl = this.user.viewAvatarUrl;
    })
  }

  loadRole(){
    this.roleService.search({}).subscribe(res => {
      debugger;
      if(res && res.success) {
        this.roles = res.data as IRole[];
      }
    })
  }

  initForm(){
    this.form = this.fb.group({
      id: [
        !this.isCreate ? this.user.id : ''
      ],
      username: [
        !this.isCreate ? this.user.username : ''
      ],
      password: [
        !this.isCreate ? this.user.password : ''
      ],
      fullName: [
        !this.isCreate ? this.user.fullName : ''
      ],
      email: [
        !this.isCreate ? this.user.fullName : ''
      ],
      phoneNumber: [
        !this.isCreate ? this.user.phoneNumber : ''
      ],
      dayOfBirth: [
        !this.isCreate ? this.user.dayOfBirth : new Date()
      ],
      gender: [
        !this.isCreate ? this.user.gender : ''
      ],
      employeeCode: [
        !this.isCreate ? this.user.employeeCode : ''
      ],
      title: [
        !this.isCreate ? this.user.title : ''
      ],
      departmentName: [
        !this.isCreate ? this.user.departmentName : ''
      ],
      description: [
        !this.isCreate ? this.user.description : ''
      ],
      status: [
        !this.isCreate ? this.user.status : ''
      ],
      locationIds: [
        !this.isCreate ? this.user.locationIds : []
      ],
      roleIds:[
        !this.isCreate ? this.user.roleIds : []
      ]
    })
  }

  async getFiles(files: any): Promise<void> {
    if (files) {
      this.files = files[0];
      getBase64(files[0]).then((data) => {
        this.imageUrl = data;
      });
      let formData: FormData = new FormData();
      formData.append('file', files[0]);
      this.storageService.upload(formData).subscribe(res=>{
        if(res && res.success) {
          this.imageUrl = res.data.path;
          this.fileId = res.data.id;
        }
      })
    }
  }

  loadLocation(){
    this.locationService.autoComplete({}).subscribe(resposne => {
      this.locationList = resposne.data as ILocation[];
    })
  }

  submit(){
    if(this.isCreate) {
      this.create();
    }
  }

  create(){
    const body = CommonUtil.trim({
      ...this.form.value,
      fileId: this.fileId
    })

    this.userService.create(body).subscribe(res => {
      if(res && res.success) {
        this.toastrSerice.success('Tạo mới thành công');
        this.router.navigateByUrl(`/user/${res.data.id}/update`)
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
