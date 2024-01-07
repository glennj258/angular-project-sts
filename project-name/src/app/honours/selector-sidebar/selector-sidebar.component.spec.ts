import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorSidebarComponent } from './selector-sidebar.component';

describe('SelectorSidebarComponent', () => {
  let component: SelectorSidebarComponent;
  let fixture: ComponentFixture<SelectorSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorSidebarComponent]
    });
    fixture = TestBed.createComponent(SelectorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
