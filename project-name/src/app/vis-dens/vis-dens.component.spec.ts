import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisDensComponent } from './vis-dens.component';

describe('VisDensComponent', () => {
  let component: VisDensComponent;
  let fixture: ComponentFixture<VisDensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisDensComponent]
    });
    fixture = TestBed.createComponent(VisDensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
