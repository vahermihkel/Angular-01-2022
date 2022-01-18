import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenyyComponent } from './menyy.component';

describe('MenyyComponent', () => {
  let component: MenyyComponent;
  let fixture: ComponentFixture<MenyyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenyyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenyyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
