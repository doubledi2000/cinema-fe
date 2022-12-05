import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LENGTH_VALIDATOR } from 'src/app/shared/constant/validators.constant';
import { AuthService } from '../../../shared/auth/auth.service';
import CommonUtil from '../../../shared/utils/common-util';
import { ROUTER_UTILS } from '../../../shared/utils/router.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(LENGTH_VALIDATOR.USERNAME_MAX_LENGTH.MAX), Validators.minLength(1)]],
      password: ['', [Validators.required]],
      rememberMe: [true]
    });
  }

  submitForm(){
    console.log(this.loginForm)
    const body = CommonUtil.trim(this.loginForm.value);
    this.authService.login(body).subscribe(response =>{
        this.authService.storeProfile(ROUTER_UTILS.film.root);
    })
  }
}
