import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceProfileCardComponent } from './workspace-profile-card.component';

describe('WorkspaceProfileCardComponent', () => {
  let component: WorkspaceProfileCardComponent;
  let fixture: ComponentFixture<WorkspaceProfileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceProfileCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
