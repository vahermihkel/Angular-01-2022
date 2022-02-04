import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YksikToodeComponent } from './yksik-toode.component';

describe('YksikToodeComponent', () => {
  let component: YksikToodeComponent;
  let fixture: ComponentFixture<YksikToodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YksikToodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YksikToodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
