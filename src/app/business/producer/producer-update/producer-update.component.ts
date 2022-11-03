import { Component, OnInit, Input} from '@angular/core';
import { Producer, IProducer } from '../../../shared/model/producer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VALIDATORS, LENGTH_VALIDATOR } from '../../../shared/constant/validators.constant';
import CommonUtil from '../../../shared/utils/common-util';
import { ProducerService } from '../../../shared/service/producer.service';
import { STATUS } from '../../../shared/constant/status.constant';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-producer-update',
  templateUrl: './producer-update.component.html',
  styleUrls: ['./producer-update.component.scss']
})
export class ProducerUpdateComponent implements OnInit {

  @Input() producer: IProducer = new Producer();

  isDetail = false;
  isUpdate = false;
  isCreate = false;
  form: FormGroup = new FormGroup({});
  LENGTH_VALIDATOR= LENGTH_VALIDATOR;
  constructor(
    private fb: FormBuilder,
    private producerService: ProducerService,
    private toastr: ToastrService,
    private modalRef: NzModalRef
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void{
    if(this.isCreate) {
      this.create();
    }else{
      this.update()
    }
  }

  initForm(){
    if(this.isCreate) {
      this.producer = new Producer();;
    };

    this.form = this.fb.group({
      code: [
        {
          value: this.producer.code ? this.producer.code : '',
          disabled: !this.isCreate ? true : false
        },
        [Validators.required]
      ],
      name: [
        {
          value: this.producer.name,
          disabled: this.isDetail ? true : false
        },
        [Validators.required]
      ],
      description: [
        {
          value: this.producer.description,
          disabled: this.isDetail ? true : false
        }
      ],
      representative: [
        {
          value: this.producer.representative,
          disabled: this.isDetail ? true : false
        }
      ],
      nationally: [
        {
          value: this.producer.nationally,
          disabled: this.isDetail ? true : false
        }
      ]
    })
    console.log(this.form.value);
  }

  create(){
    const body = CommonUtil.trim({
      ...this.form.value
    });
    this.producerService.create(body).subscribe(data => {
      if(data && data.code == STATUS.SUCCESS_200) {
        this.toastr.success('');
        this.modalRef.close({
          success: true,
          value: data?.data as IProducer
        })
      }else {
        this.toastr.error(`${data.message}`);
        this.modalRef.close({
          success: false,
          value: null
        })
      }
    })
  }
  update(){
    this.form.enable();
    const body = CommonUtil.trim({
      ...this.form.value
    })
    if(this.producer.id) {
      this.producerService.update(this.producer.id, body).subscribe(data=>{
        if(data.code == STATUS.SUCCESS_200) {
            this.toastr.success('Cập nhật nhà sản xuất thành công thành công');
            this.modalRef.close({
              success: true,
              value: data?.data as IProducer
            })
        }else{
          this.toastr.error(`${data.message}`);
        }
      })
    }
  }

  onCancel(){
    this.modalRef.close({success: false, value: null})
  }

  nextToUpdate(){
    this.isDetail = false;
    this.isUpdate = true;
    this.form.controls.name.enable();
    this.form.controls.description.enable();
  }
}
