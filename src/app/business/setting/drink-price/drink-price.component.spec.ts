import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkPriceComponent } from './drink-price.component';

describe('DrinkPriceComponent', () => {
  let component: DrinkPriceComponent;
  let fixture: ComponentFixture<DrinkPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinkPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
