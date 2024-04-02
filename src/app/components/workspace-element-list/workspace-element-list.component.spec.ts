import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceElementListComponent } from './workspace-element-list.component';

describe('WorkspaceElementComponent', () => {
  let component: WorkspaceElementListComponent;
  let fixture: ComponentFixture<WorkspaceElementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceElementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
