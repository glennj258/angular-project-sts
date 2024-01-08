import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanistContentComponent } from './urbanist-content.component';

describe('UrbanistContentComponent', () => {
  let component: UrbanistContentComponent;
  let fixture: ComponentFixture<UrbanistContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrbanistContentComponent]
    });
    fixture = TestBed.createComponent(UrbanistContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
