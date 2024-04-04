import { Component, OnInit, inject } from '@angular/core';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-workspace-project-links',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './workspace-project-links.component.html',
  styleUrl: './workspace-project-links.component.scss',
})
export class WorkspaceProjectLinksComponent extends WorkspaceBaseElementComponent implements OnInit {
  listItems: { id: number; title: string, description: string, url: string }[] = [];
  ID_COUNTER: number = 0;
  profileLinksForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }

   ngOnInit(): void {
    this.profileLinksForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required)
    });
  this.onChanges();
  }

  onChanges(): void {
    this.profileLinksForm.valueChanges.subscribe(val => {
      this.workspaceContext.valid.update(() => true);
      if(this.profileLinksForm.valid){
        //prepare data and update context
      }
      this.workspaceContext.valid.update((curr) => (curr && this.profileLinksForm.valid));
    });
  }

  addProjectItem() {
    this.listItems.push({
      id: this.ID_COUNTER,
      title: '',
      description: '',
      url: ''
    });
    this.ID_COUNTER++;
  }

  deleteProjectItem(item: { id: number; title: string, description: string, url: string }) {
    this.listItems = this.listItems.filter((li) => li.id !== item.id);
    this.ID_COUNTER--;
  }

  deleteElement(event: any){
    this.workspaceContext.deleteElement(this.unique_key);
  }
}
