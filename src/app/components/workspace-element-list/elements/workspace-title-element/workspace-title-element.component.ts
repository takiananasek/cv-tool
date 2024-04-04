import { Component, OnInit, inject } from '@angular/core';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workspace-title-element',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatIconModule,
    ReactiveFormsModule],
  templateUrl: './workspace-title-element.component.html',
  styleUrl: './workspace-title-element.component.scss',
})
export class WorkspaceTitleElementComponent extends WorkspaceBaseElementComponent implements OnInit{

  titleForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }

  ngOnInit(): void {
    this.titleForm = this.formBuilder.group({
      title: new FormControl('', Validators.required)
    });
  this.onChanges();
  }

  onChanges(): void {
    this.titleForm.valueChanges.subscribe(val => {
      this.workspaceContext.valid.update(() => true);
      if(this.titleForm.valid){
        //prepare data and update context
        console.log(val);
      }
      this.workspaceContext.valid.update((curr) => (curr && this.titleForm.valid));
    });
  }

  deleteElement(event: any) {
    this.workspaceContext.deleteElement(this.unique_key);
  }
}
