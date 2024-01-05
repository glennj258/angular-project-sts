import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessMapComponent } from './access-map.component';

describe('AccessMapComponent', () => {
  let component: AccessMapComponent;
  let fixture: ComponentFixture<AccessMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessMapComponent]
    });
    fixture = TestBed.createComponent(AccessMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
