import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportVisiteComponent } from './rapport-visite.component';

describe('RapportVisiteComponent', () => {
  let component: RapportVisiteComponent;
  let fixture: ComponentFixture<RapportVisiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportVisiteComponent]
    });
    fixture = TestBed.createComponent(RapportVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
