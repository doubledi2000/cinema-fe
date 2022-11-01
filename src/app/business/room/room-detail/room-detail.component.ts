import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { IChair, Chair } from '../../../shared/model/chair.model';
import { IRoom, Room } from '../../../shared/model/room.model';
import { IRow, Row } from '../../../shared/model/row.model';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'],
})
export class RoomDetailComponent implements OnInit {
  @Input() room: IRoom = new Room();
  scale = 1200 / (45 * 10 + 100);

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef
    ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    let fArr: FormArray = new FormArray([]);
    this.room.rows.forEach((e) => {
      fArr.push(this.initRowGroup(e));
    });
    this.form = this.fb.group({
      rows: fArr,
    });
  }

  get rows() {
    return this.form.controls['rows'] as FormArray;
  }

  initRowGroup(row: IRow) {
    let farr: FormArray = new FormArray([]);
    let chairs = row.chairs.forEach((ele) => {
      farr.push(this.initChairGroup(ele));
    });
    return this.fb.group({
      id: [row.id,
      ],
      name: [ row.name
      ],
      code: [row.code,
      ],
      chairs: farr,
    });
  }

  initChairGroup(chair: IChair) {
    return this.fb.group({
      id: [chair.id],
      chairType: [chair.chairType],
    });
  }

  showForm() {
    this.room = {
      ...this.room,
      ...this.form.value
    }
    this.modalRef.close({
      success: true,
      value: this.room
    })
  }

  show(row: any, rIndex: number) {
    if (this.countSeat(row) > this.room.maxChairPerRow) {
      const index = this.getChairRemoveIndex(row);
      this.form.get('rows')['controls'][rIndex].get('chairs').removeAt(index);
    } else if (this.countSeat(row) < this.room.maxChairPerRow) {
      this.form.get('rows')['controls'][rIndex].get('chairs').push(this.initChairGroup({ id: null, chairType: 'NORMAL' }));
    }
  }

  countSeat(row: any) {
    const sum = row.value.chairs.reduce((pre, current) => {
      if (current.chairType == 'SWEET') return pre + 2;
      else return pre + 1;
    }, 0);
    return sum;
  }

  visibleSweet(row: any) {
    const sum = row.value.chairs.reduce((pre, current) => {
      if (current.chairType == 'SWEET') return pre + 1;
      return pre;
    }, 0);
    return sum < (this.room.maxChairPerRow / 2 - 0.7);
  }

  getChairRemoveIndex(row:any) {
    let index = 0;
    row.value.chairs.forEach((pre, current) => {
      if(pre.chairType != 'SWEET') {
        index = current;
      }
    })
    return index;

  }

  getRowArray(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  getChairArray(fb: FormGroup): FormArray {
    return fb.get('chairs') as FormArray;
  }
}
