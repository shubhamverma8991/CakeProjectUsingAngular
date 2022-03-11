import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeagainComponent } from './welcomeagain.component';

describe('WelcomeagainComponent', () => {
  let component: WelcomeagainComponent;
  let fixture: ComponentFixture<WelcomeagainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeagainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeagainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
