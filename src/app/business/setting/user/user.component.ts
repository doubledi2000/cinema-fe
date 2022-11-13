import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { IUser } from '../../../shared/model/user.model';
import { PAGINATION } from '../../../shared/constant/pagination.constant';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList: IUser[] = [];
  total = 0;

  searchForm: FormGroup = new FormGroup({});

  searchRequest = {
    keyword: null,
    locationIds: [],
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT
  }

  constructor(private userService: UserService, private fb: FormBuilder) { }

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

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.searchRequest.pageIndex = pageIndex;
    this.searchRequest.pageSize = pageSize;
    this.ngOnInit();
  }
}
