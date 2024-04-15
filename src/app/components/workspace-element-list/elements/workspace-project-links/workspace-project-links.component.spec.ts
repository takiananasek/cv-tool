import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceProjectLinksComponent } from './workspace-project-links.component';

describe('WorkspaceProjectLinksComponent', () => {
  let component: WorkspaceProjectLinksComponent;
  let fixture: ComponentFixture<WorkspaceProjectLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceProjectLinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceProjectLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
