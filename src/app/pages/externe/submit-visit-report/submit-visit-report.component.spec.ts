import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitVisitReportComponent } from './submit-visit-report.component';

describe('SubmitVisitReportComponent', () => {
  let component: SubmitVisitReportComponent;
  let fixture: ComponentFixture<SubmitVisitReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitVisitReportComponent]
    });
    fixture = TestBed.createComponent(SubmitVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
