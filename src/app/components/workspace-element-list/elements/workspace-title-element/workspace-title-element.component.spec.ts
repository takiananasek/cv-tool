import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceTitleElementComponent } from './workspace-title-element.component';

describe('WorkspaceTitleElementComponent', () => {
  let component: WorkspaceTitleElementComponent;
  let fixture: ComponentFixture<WorkspaceTitleElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceTitleElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceTitleElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
