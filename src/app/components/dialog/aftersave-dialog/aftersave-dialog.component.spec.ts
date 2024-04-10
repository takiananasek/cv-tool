import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AftersaveDialogComponent } from './aftersave-dialog.component';

describe('AftersaveDialogComponent', () => {
  let component: AftersaveDialogComponent;
  let fixture: ComponentFixture<AftersaveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AftersaveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AftersaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
