import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceBaseElementComponent } from './workspace-base-element.component';

describe('WorkspaceBaseElementComponent', () => {
  let component: WorkspaceBaseElementComponent;
  let fixture: ComponentFixture<WorkspaceBaseElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceBaseElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceBaseElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
