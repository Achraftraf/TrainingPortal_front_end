import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingFormComponent } from './training-form.component';

describe('TrainingFormComponent', () => {
  let component: TrainingFormComponent;
  let fixture: ComponentFixture<TrainingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingFormComponent]
    });
    fixture = TestBed.createComponent(TrainingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
