import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PAGINATION } from '../../../shared/constant/pagination.constant';
import { ILocation } from '../../../shared/model/location.model';
import { IRole } from '../../../shared/model/role.model';
import { IUser } from '../../../shared/model/user.model';
import { LocationService } from '../../../shared/service/location.service';
import { RoleService } from '../../../shared/service/role.service';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList: IUser[] = [];
  total = 0;
  locationList: ILocation[] = [];
  roleList: IRole[] = [];

  searchForm: FormGroup = new FormGroup({});

  searchRequest = {
    keyword: null,
    locationIds: [],
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT
  }

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService,
    private locationService: LocationService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.search();
  }
  initForm(){
    this.searchForm = this.fb.group({
      keyword: '',
      locationIds: []
    })
  }

  create(){
    this.router.navigateByUrl(`setting/user/create`)
  }

  view(id?: string) {
    this.router.navigateByUrl(`setting/user/${id}/detail`)
  }

  search(){
    const searchRequest = {
      ...this.searchRequest,
      ...this.searchForm.value
    }
    this.userService.search(searchRequest).subscribe(response=>{
      this.userList = response?.data as IUser[];
      this.total = response?.page.total || 0
    })
  }

  loadLocation(){
    this.locationService.autoComplete({}).subscribe(res=> {
      if(res && res.success) {
        this.locationList = res.data as ILocation[];
      }
    })
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.searchRequest.pageIndex = pageIndex;
    this.searchRequest.pageSize = pageSize;
    this.ngOnInit();
  }
}
