import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurInscriptionComponent } from './formateur-inscription.component';

describe('FormateurInscriptionComponent', () => {
  let component: FormateurInscriptionComponent;
  let fixture: ComponentFixture<FormateurInscriptionComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [FormateurInscriptionComponent]
    })

    fixture = TestBed.createComponent(FormateurInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
