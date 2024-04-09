import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextfieldViewComponent } from './textfield-view.component';

describe('TextfieldViewComponent', () => {
  let component: TextfieldViewComponent;
  let fixture: ComponentFixture<TextfieldViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextfieldViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextfieldViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
