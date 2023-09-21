import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoResidantComponent } from './info-residant.component';

describe('InfoResidantComponent', () => {
  let component: InfoResidantComponent;
  let fixture: ComponentFixture<InfoResidantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoResidantComponent]
    });
    fixture = TestBed.createComponent(InfoResidantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
