import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsaveDialogComponent } from './onsave-dialog.component';

describe('OnsaveDialogComponent', () => {
  let component: OnsaveDialogComponent;
  let fixture: ComponentFixture<OnsaveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnsaveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnsaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
