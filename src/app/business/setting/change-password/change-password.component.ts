import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';

import { LENGTH_VALIDATOR, VALIDATORS } from '../../../shared/constant/validators.constant';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form?: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalRef: NzModalRef,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(LENGTH_VALIDATOR.PASSWORD_MAX_LENGTH.MAX),
            Validators.pattern(VALIDATORS.PASSWORD),
          ],
        ],
        repeatPassword: [
          '',
          [
            Validators.required,
            Validators.maxLength(LENGTH_VALIDATOR.PASSWORD_MAX_LENGTH.MAX),
          ],
        ],
      }
    );
  }

  onCancel(){
    this.modalRef.close({
      success: false
    })
  }

  onSubmit(){
    const body = this.form.value;
    this.userService.changePassword(body).subscribe(res => {
      if(res.success) {
        this.modalRef.close({
          success: true
        })
        this.toastrService.success('Đổi mật khẩu thành công');
      }
    })
  }
}
