import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LENGTH_VALIDATOR } from '../../../shared/constant/validators.constant';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  isDetail = true;
  LENGTH_VALIDATOR= LENGTH_VALIDATOR;

  form: FormGroup = new FormGroup({});
  files: [] | any;
  imageUrl?: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  async getFiles(files: any): Promise<void> {
    console.log(files);
    if (files) {
      this.files = files[0];
      getBase64(files[0]).then((data) => {
        this.imageUrl = data;
      });
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
