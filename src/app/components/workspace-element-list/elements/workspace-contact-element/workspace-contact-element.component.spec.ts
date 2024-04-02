import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceContactElementComponent } from './workspace-contact-element.component';

describe('WorkspaceContactElementComponent', () => {
  let component: WorkspaceContactElementComponent;
  let fixture: ComponentFixture<WorkspaceContactElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceContactElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceContactElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
