import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidFormDialogComponent } from './invalid-form-dialog.component';

describe('InvalidFormDialogComponent', () => {
  let component: InvalidFormDialogComponent;
  let fixture: ComponentFixture<InvalidFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvalidFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
