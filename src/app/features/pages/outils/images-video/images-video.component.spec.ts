import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesVideoComponent } from './images-video.component';

describe('ImagesVideoComponent', () => {
  let component: ImagesVideoComponent;
  let fixture: ComponentFixture<ImagesVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesVideoComponent]
    });
    fixture = TestBed.createComponent(ImagesVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
