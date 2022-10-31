import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-title',
  templateUrl: './table-title.component.html',
  styleUrls: ['./table-title.component.scss']
})
export class TableTitleComponent implements OnInit {

  @Input() title = '';
  @Input() secondTitle = { title: '', url: '' };
  @Input() thirdTitle = { title: '', url: '' };
  @Input() showBack = false;
  @Input() url = '';
  @Input() navigationExtras = {};
  // TH riêng của survey result
  @Input() beginStage = false;
  @Input() tabIndexSurvey = 0;
  @Input() isSameComponent = false;
  @Output() backSameComponent = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onBack(): void {
    if (this.url !== '' && this.navigationExtras) {
      // TH riêng của survey result
      // Back lại trang cũ khi đang ở trang CompanyDetail (mở từ trang StageDetail)
      if (
        this.beginStage &&
        this.tabIndexSurvey !== 0
      ) {
        window.history.back();
      } else {
        this.router.navigate([`${this.url}`], this.navigationExtras);
      }
    } else {
      if (this.secondTitle.url) {
        this.router.navigate([`${this.secondTitle.url}`]);
      } else {
        window.history.back();
      }
    }
  }

  onBackSameComponent(): void {
    this.backSameComponent.emit('true');
  }
}
