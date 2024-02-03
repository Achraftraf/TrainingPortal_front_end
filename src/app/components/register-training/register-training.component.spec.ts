import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTrainingComponent } from './register-training.component';

describe('RegisterTrainingComponent', () => {
  let component: RegisterTrainingComponent;
  let fixture: ComponentFixture<RegisterTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTrainingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
