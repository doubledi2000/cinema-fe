import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../shared/service/user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LocationService } from '../../../../shared/service/location.service';
import { ILocation } from '../../../../shared/model/location.model';
import { IUser, User } from '../../../../shared/model/user.model';

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
  constructor(
    private userService: UserService,
    private toastrSerice: ToastrService,
    private locationService: LocationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      id: [
        {
          value: this.user.id
        }
      ],
      username: [
        {
          value: this.user.username
        }
      ],
      password: [
        {
          value: this.user.password
        }
      ],
      fullName: [
        {
          value: this.user.fullName
        }
      ],
      email: [
        {
          value: this.user.email
        }
      ],
      phoneNumber: [
        {
          value: this.user.phoneNumber
        }
      ],
      dayOfBirth: [
        this.user.dayOfBirth || new Date()
      ],
      gender: [
        {
          value: this.user.gender
        }
      ],
      employeeCode: [
        {
          value: this.user.employeeCode
        }
      ],
      title: [
        {
          value: this.user.title
        }
      ],
      departmentName: [
        {
          value: this.user.departmentName
        }
      ],
      description: [
        {
          value: this.user.description
        }
      ],
      status: [
        {
          value: this.user.status
        }
      ],
      locationIds: [
        {
          value: []
        }
      ],
      roleIds: [
        {
          value: []
        }
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
