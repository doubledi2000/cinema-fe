import { Component, OnInit } from '@angular/core';
import { ILocation } from '../../../shared/model/location.model';
import { GENDER } from '../../../shared/constant/common.constant';
import { IRole } from '../../../shared/model/role.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../../shared/service/storage.service';
import { UserService } from '../../../shared/service/user.service';
import { IUser } from '../../../shared/model/user.model';
import { LocationService } from '../../../shared/service/location.service';
import { RoleService } from '../../../shared/service/role.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  locationList?: ILocation[] = [];
  genders = GENDER;
  roles?: IRole[] = [];
  imageUrl?: any;
  files?: any[];
  form?: FormGroup = new FormGroup({});
  fileId?: any;
  currentUser?: IUser;
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private locationService: LocationService,
    private roleService: RoleService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUser();
  }

  initForm(){
      this.form = this.fb.group({
        id: [
          this.currentUser?.id || ''
        ],
        username: [
          {
            value: this.currentUser?.username || '',
            disabled: true
          },
          [Validators.required]
        ],
        fullName: [
            this.currentUser?.fullName || '',
           [Validators.required]
        ],
        email: [
          this.currentUser?.email || '',
          [Validators.required]
        ],
        phoneNumber: [
          this.currentUser?.phoneNumber || '',
          [Validators.required]
        ],
        dayOfBirth: [
          {
            value: new Date(),
            disabled: false
          },
          [Validators.required]
        ],
        gender: [
          {
            value: this.currentUser?.gender || 'MALE',
            disabled: false
          }
        ],
        employeeCode: [
          {
            value: this.currentUser?.employeeCode || '',
            disabled: true
          }
        ],
        title: [
          {
            value: this.currentUser?.title || '',
            disabled: true
          },
          [Validators.required]
        ],
        departmentName: [
          {
            value: this.currentUser?.departmentName || '',
            disabled: true
          },
          [Validators.required]
        ],
        description: [
          {
            value: this.currentUser?.description || '',
            disabled: false
          }
        ],
        locationIds: [
          {
            value: this.currentUser?.locationIds || [],
            disabled: true
          }
        ],
        roleIds:[
          this.currentUser?.roleIds || []
        ]
      })
  }

  loadUser(){
    this.userService.myProfile().subscribe(res => {
      if(res && res.success) {
        this.currentUser = res.data as IUser;
        console.log(this.currentUser);
        this.initForm();
        this.form.patchValue({dayOfBirth:new Date(this.currentUser?.dayOfBirth[0], this.currentUser?.dayOfBirth[1] - 1, this.currentUser?.dayOfBirth[2])})
        this.imageUrl = this.currentUser.viewAvatarUrl;
        this.locationService.findByIds({ids:this.currentUser.locationIds}).subscribe(response => {
          this.locationList = response.data as ILocation[];
        })
        this.roleService.findByIds({ids:this.currentUser.roleIds}).subscribe(response => {
          this.roles = response.data as IRole[];
        })
      }
    })
  }

  submit(){
    console.log(this.form.value)
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

}
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
