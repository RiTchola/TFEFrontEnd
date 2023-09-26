import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExterneComponent } from './externe.component';

describe('ExterneComponent', () => {
  let component: ExterneComponent;
  let fixture: ComponentFixture<ExterneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExterneComponent]
    });
    fixture = TestBed.createComponent(ExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
