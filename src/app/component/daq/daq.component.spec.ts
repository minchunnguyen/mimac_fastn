import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaqComponent } from './daq.component';

describe('DaqComponent', () => {
  let component: DaqComponent;
  let fixture: ComponentFixture<DaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
