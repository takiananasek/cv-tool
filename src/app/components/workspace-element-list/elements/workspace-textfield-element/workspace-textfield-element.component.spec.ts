import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceTextfieldElementComponent } from './workspace-textfield-element.component';

describe('WorkspaceTextfieldElementComponent', () => {
  let component: WorkspaceTextfieldElementComponent;
  let fixture: ComponentFixture<WorkspaceTextfieldElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceTextfieldElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceTextfieldElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
