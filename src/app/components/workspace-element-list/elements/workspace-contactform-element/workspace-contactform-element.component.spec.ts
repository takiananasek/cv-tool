import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceContactformElementComponent } from './workspace-contactform-element.component';

describe('WorkspaceContactformElementComponent', () => {
  let component: WorkspaceContactformElementComponent;
  let fixture: ComponentFixture<WorkspaceContactformElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceContactformElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceContactformElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
