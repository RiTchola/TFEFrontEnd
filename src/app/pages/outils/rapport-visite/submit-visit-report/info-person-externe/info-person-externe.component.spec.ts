import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPersonExterneComponent } from './info-person-externe.component';

describe('InfoPersonExterneComponent', () => {
  let component: InfoPersonExterneComponent;
  let fixture: ComponentFixture<InfoPersonExterneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPersonExterneComponent]
    });
    fixture = TestBed.createComponent(InfoPersonExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
