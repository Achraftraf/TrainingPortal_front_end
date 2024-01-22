import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseListComponent } from './entreprise-list.component';

describe('EntrepriseListComponent', () => {
  let component: EntrepriseListComponent;
  let fixture: ComponentFixture<EntrepriseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepriseListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EntrepriseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
