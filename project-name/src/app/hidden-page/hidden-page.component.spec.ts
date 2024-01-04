import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenPageComponent } from './hidden-page.component';

describe('HiddenPageComponent', () => {
  let component: HiddenPageComponent;
  let fixture: ComponentFixture<HiddenPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiddenPageComponent]
    });
    fixture = TestBed.createComponent(HiddenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
