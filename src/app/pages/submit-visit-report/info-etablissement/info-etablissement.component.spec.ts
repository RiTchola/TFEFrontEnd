import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEtablissementComponent } from './info-etablissement.component';

describe('InfoEtablissementComponent', () => {
  let component: InfoEtablissementComponent;
  let fixture: ComponentFixture<InfoEtablissementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoEtablissementComponent]
    });
    fixture = TestBed.createComponent(InfoEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
