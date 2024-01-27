import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSelectionDialogComponent } from './date-selection-dialog.component';

describe('DateSelectionDialogComponent', () => {
  let component: DateSelectionDialogComponent;
  let fixture: ComponentFixture<DateSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateSelectionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function beforeEach(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}
