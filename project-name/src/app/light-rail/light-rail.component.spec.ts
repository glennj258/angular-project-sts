import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightRailComponent } from './light-rail.component';

describe('LightRailComponent', () => {
  let component: LightRailComponent;
  let fixture: ComponentFixture<LightRailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LightRailComponent]
    });
    fixture = TestBed.createComponent(LightRailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
