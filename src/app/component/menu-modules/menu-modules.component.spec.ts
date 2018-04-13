import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModulesComponent } from './menu-modules.component';

describe('MenuModulesComponent', () => {
  let component: MenuModulesComponent;
  let fixture: ComponentFixture<MenuModulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuModulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
