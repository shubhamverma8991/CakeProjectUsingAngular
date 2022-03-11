import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartsummartComponent } from './cartsummart.component';

describe('CartsummartComponent', () => {
  let component: CartsummartComponent;
  let fixture: ComponentFixture<CartsummartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartsummartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartsummartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
