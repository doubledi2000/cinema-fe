import { Component, OnInit } from '@angular/core';
import { LENGTH_VALIDATOR } from '../../../shared/constant/validators.constant';
import { STATUS } from '../../../shared/constant/status.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILocation, Location } from '../../../shared/model/location.model';
import { LocationService } from '../../../shared/service/location.service';
import CommonUtil from '../../../shared/utils/common-util';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss'],
})
export class LocationDetailComponent implements OnInit {
  isCreate = false;
  isDetail = false;
  isUpdate = false;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  STATUS = STATUS;
  form: FormGroup = new FormGroup({});
  location: ILocation = new Location();
  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private modalRef: NzModalRef,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      code: [
        {
          value: this.location.code,
          disabled: !this.isCreate ? true : false,
        },
        [Validators.required],
      ],
      name: [
        {
          value: this.location.name,
          disabled: this.isDetail ? true : false,
        },
        [Validators.required],
      ],
      address: [
        {
          value: this.location.address,
          disabled: this.isDetail ? true : false,
        },
        [Validators.required],
      ],
    });
  }

  onCancel() {
    this.modalRef.close({success: false, value: null})
  }

  onSubmit() {
    if (this.isCreate) {
      this.create();
    } else {
      this.update();
    }
  }

  nextToUpdate() {
    this.isDetail = false;
    this.isUpdate = true;
    this.form.controls.name.enable();
    this.form.controls.address.enable();
  }

  create() {
    const body = CommonUtil.trim({
      ...this.form.value
    })

    this.locationService.create(body).subscribe(response => {
      if(response && response.code == STATUS.SUCCESS_200) {
        if(response && response.code == STATUS.SUCCESS_200) {
          this.toast.success('Them moi thanh cong');
          this.modalRef.close({
            success: true,
            value: response?.data as ILocation
          })
        }
      }
    })
  }

  update() {
    this.form.enable();
    const body = CommonUtil.trim({
      ...this.form.value
    })

    if(this.location.id) {
      this.locationService.update(this.location.id, body).subscribe(response => {
        if(response.code == STATUS.SUCCESS_200) {
          this.toast.success('Cập nhật thông tin chi nhánh thành công');
          this.modalRef.close({
            success: true,
            value: response?.data as Location
          })
      }else{
        this.toast.error(`${response.message}`);
        this.modalRef.close({success: false, value: null});
      }
      })
    }
  }
}
