import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-workspace-contactform-element',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './workspace-contactform-element.component.html',
  styleUrl: './workspace-contactform-element.component.scss'
})
export class WorkspaceContactformElementComponent extends WorkspaceBaseElementComponent implements OnInit{
  contactForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  constructor(public workspaceContext: WorkspaceContext){
    super(workspaceContext);
  }
  
  deleteElement(event: any){
    this.workspaceContext.deleteElement(this.unique_key);
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  this.onChanges();
  }

  onChanges(): void {
    this.contactForm.valueChanges.subscribe(val => {
      this.workspaceContext.valid.update(() => true);
      if(this.contactForm.valid){
        //prepare data and update context
        console.log(val);
      }
      this.workspaceContext.valid.update((curr) => (curr && this.contactForm.valid));
    });
  }
}
