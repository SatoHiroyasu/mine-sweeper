import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineButtonComponent } from './mine-button.component';

describe('MineButtonComponent', () => {
  let component: MineButtonComponent;
  let fixture: ComponentFixture<MineButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
