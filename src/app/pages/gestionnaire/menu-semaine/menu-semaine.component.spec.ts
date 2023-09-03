import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSemaineComponent } from './menu-semaine.component';

describe('MenuSemaineComponent', () => {
  let component: MenuSemaineComponent;
  let fixture: ComponentFixture<MenuSemaineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuSemaineComponent]
    });
    fixture = TestBed.createComponent(MenuSemaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
