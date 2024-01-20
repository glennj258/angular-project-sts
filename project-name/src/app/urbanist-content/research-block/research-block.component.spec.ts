import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchBlockComponent } from './research-block.component';

describe('ResearchBlockComponent', () => {
  let component: ResearchBlockComponent;
  let fixture: ComponentFixture<ResearchBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResearchBlockComponent]
    });
    fixture = TestBed.createComponent(ResearchBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
