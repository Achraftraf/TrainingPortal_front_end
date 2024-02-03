// formateur.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormateurComponent } from './formateur.component';

describe('FormateurComponent', () => {
  let component: FormateurComponent;
  let fixture: ComponentFixture<FormateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
