import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCaptionComponent } from './img-caption.component';

describe('ImgCaptionComponent', () => {
  let component: ImgCaptionComponent;
  let fixture: ComponentFixture<ImgCaptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgCaptionComponent]
    });
    fixture = TestBed.createComponent(ImgCaptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
