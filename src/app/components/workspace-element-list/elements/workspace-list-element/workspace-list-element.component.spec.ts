import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceListElementComponent } from './workspace-list-element.component';

describe('WorkspaceListElementComponent', () => {
  let component: WorkspaceListElementComponent;
  let fixture: ComponentFixture<WorkspaceListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceListElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
