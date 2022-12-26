import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IDrink } from '../../../../shared/model/drinks.model';
import { FileService } from '../../../../shared/service/file.service';
import { StorageService } from '../../../../shared/service/storage.service';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit {
  @Input() isDetail;
  @Input() isUpdate;
  @Input() isCreate;
  @Input() drink: IDrink;
  imageUrl?: any = null;
  files: [] | any;
  fileId?: string = '';

  form: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private fileService: FileService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.initForm();
    if(!this.isCreate) {
      debugger;
      this.imageUrl = this.drink.filePath;
    }
  }

  initForm(){
    this.form = this.fb.group({
      code: [
        {
          value: !this.isCreate ? this.drink.code : '',
          disabled: true
        }
      ],
      name: [
        {
          value: !this.isCreate ? this.drink.name : '',
          disabled: this.isDetail
        },
        [Validators.required]
      ],
      price: [
        {
          value: !this.isCreate ? this.drink.price  : 0,
          disabled: this.isDetail
        },
        [Validators.required]
      ],
      description: [
        {
          value: !this.isCreate ? this.drink.description : '',
          disabled: this.isDetail
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
      this.storageService.upload(files[0]).subscribe(res=>{
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
