import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRole, Role } from '../../../../shared/model/role.model';
import CommonUtil from '../../../../shared/utils/common-util';
import { RoleService } from '../../../../shared/service/role.service';
import { STATUS } from '../../../../shared/constant/status.constant';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  isDetail: boolean;
  isCreate: boolean;
  form: FormGroup = new FormGroup({});
  @Input() role?: IRole = new Role();
  @Input() isUpdate?: boolean
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private modalRef: NzModalRef,
    private toast: ToastrService
  ) {}

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      code: [
        {
          value:  this.role.code,
          disabled: !this.isCreate ? true : false
        }
      ],
      name: [
        {
          value: this.role.name,
          disabled: this.isDetail ? true : false
        }
      ],
      description: [
        this.role.description ? this.role.description : ''
        ,
        [Validators.required]
      ],
      isRoot: [
        this.role.isRoot || false
      ]
    })
  }


  onCancel(){
    this.modalRef.close({
      success: false
    })
  }

  nextToUpdate(){

  }

  onSubmit(){
    if(this.isCreate) {
      this.create();
    } else if (this.isUpdate) {
      this.update();
    }
  }

  create(){
    const body = CommonUtil.trim(
      this.form.value
    )
    console.log(body)
    this.roleService.create(body).subscribe(resposne => {
      if(resposne && resposne.code == STATUS.SUCCESS_200) {
        this.toast.success('');
        this.modalRef.close({
          success: true,
          value: resposne?.data as IRole
        })
      }
    })
  }

  update(){
    const body = CommonUtil.trim(
      this.form.value
    )
    this.roleService.update(this.role.id, body).subscribe(resposne => {
      if(resposne && resposne.code == STATUS.SUCCESS_200) {
        this.toast.success('Cập nhật thành công');
        this.modalRef.close({
          success: true,
          value: resposne?.data as IRole
        })
      }
    })
  }

  loadRole(){

  }
}
