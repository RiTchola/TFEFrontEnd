import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVisiteComponent } from './info-visite.component';

describe('InfoVisiteComponent', () => {
  let component: InfoVisiteComponent;
  let fixture: ComponentFixture<InfoVisiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoVisiteComponent]
    });
    fixture = TestBed.createComponent(InfoVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
