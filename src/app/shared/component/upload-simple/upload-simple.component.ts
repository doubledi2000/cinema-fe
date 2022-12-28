import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-upload-simple',
  templateUrl: './upload-simple.component.html',
  styleUrls: ['./upload-simple.component.scss']
})
export class UploadSimpleComponent implements OnInit {

  @Input() action = '';
  @Input() className = '';
  @Input() disable = false;
  @Input() isShow = true;
  @Input() easyUpload = true;
  @Input() multiple = false;
  @Input() acceptTypeFiles: string[] = [ 'excel'];
  @Output() emitter: EventEmitter<any> = new EventEmitter();
  readonly typeFiles = [

    {
      type: 'excel',
      value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
    {
      type: 'excel',
      value: 'application/vnd.ms-excel'
    }
  ];
  acceptFiles: string[] = [];
  files: NzUploadFile[] = [];

  MAX_FILE_SIZE = 10 * 1024 * 1024;

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.filesAccept();
  }

  handleChange(event: any): void {
    const file = event.target.files[0];
    this.files = this.valid([file]);
    this.emitter.emit(this.files);
  }

  filesAccept(): void {
    if (this.acceptTypeFiles.includes('default')) {
      this.acceptFiles = this.typeFiles.map(file => file.value);
    } else {
      this.acceptFiles = this.typeFiles
        .filter(file => this.acceptTypeFiles.includes(file.type))
        .map(val => val.value);
    }
  }

  valid(files: any): any {
    return files.filter((file: any) => this.acceptFiles.includes(file?.type) && file?.size <= this.MAX_FILE_SIZE);
  }

  getSourceAvatar(): string {
    return `assets/images/button/upload-icon.png`;
  }
}
