import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitGazComponent } from './circuit-gaz.component';

describe('CircuitGazComponent', () => {
  let component: CircuitGazComponent;
  let fixture: ComponentFixture<CircuitGazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitGazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitGazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
