import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardViewComponent } from './profile-card-view.component';

describe('ProfileCardViewComponent', () => {
  let component: ProfileCardViewComponent;
  let fixture: ComponentFixture<ProfileCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCardViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
