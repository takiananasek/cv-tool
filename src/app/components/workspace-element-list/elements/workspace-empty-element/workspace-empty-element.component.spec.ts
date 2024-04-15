import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceEmptyElementComponent } from './workspace-empty-element.component';

describe('WorkspaceContactElementComponent', () => {
  let component: WorkspaceEmptyElementComponent;
  let fixture: ComponentFixture<WorkspaceEmptyElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceEmptyElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceEmptyElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
