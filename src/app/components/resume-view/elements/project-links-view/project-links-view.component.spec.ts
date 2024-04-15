import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLinksViewComponent } from './project-links-view.component';

describe('ProjectLinksViewComponent', () => {
  let component: ProjectLinksViewComponent;
  let fixture: ComponentFixture<ProjectLinksViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectLinksViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectLinksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
