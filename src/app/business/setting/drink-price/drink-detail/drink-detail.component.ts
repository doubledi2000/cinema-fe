import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../../../shared/service/file.service';
import { IDrink } from '../../../../shared/model/drinks.model';

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
  imageUrl;
  files: [] | any;

  form: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.imageUrl = this.drink.imagePath;
  }

  initForm(){
    this.form = this.fb.group({
      code: [
        {
          value: this.drink.code,
          disabled: true
        }
      ],
      name: [
        {
          value: this.drink.name,
          disabled: this.isDetail
        },
        [Validators.required]
      ],
      price: [
        {
          value: this.drink.price,
          disabled: this.isDetail
        },
        [Validators.required]
      ],
      description: [
        {
          value: this.drink.description,
          disabled: this.isDetail
        }
      ],
       status: [
        this.drink.status
       ]
    })
  }


  async getFiles(files: any): Promise<void> {
    if (files) {
      this.files = files[0];
      getBase64(files[0]).then((data) => {
        this.imageUrl = data;
      });
      this.fileService.upload(files[0]).subscribe(res=>{
        if(res && res.success) {
          this.imageUrl = res.data.path;
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
