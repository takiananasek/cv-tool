import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workspace-profile-card',
  standalone: true,
  imports: [
    FormsModule,
     MatFormFieldModule, 
     MatInputModule,
     TextFieldModule, 
     MatIconModule, ReactiveFormsModule],
  templateUrl: './workspace-profile-card.component.html',
  styleUrl: './workspace-profile-card.component.scss'
})
export class WorkspaceProfileCardComponent extends WorkspaceBaseElementComponent implements OnInit{

  profileForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  constructor(public workspaceContext: WorkspaceContext){
    super(workspaceContext);
  }

    ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

  this.onChanges();
  }

  onChanges(): void {
    this.profileForm.valueChanges.subscribe(val => {
      this.workspaceContext.valid.update(() => true);
      if(this.profileForm.valid){
        //prepare data and update context
      }
      this.workspaceContext.valid.update((curr) => (curr && this.profileForm.valid));
    });
  }

  deleteElement(event: any) {
    this.workspaceContext.deleteElement(this.unique_key);
  }
}




