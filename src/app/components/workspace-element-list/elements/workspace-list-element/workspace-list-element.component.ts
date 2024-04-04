import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workspace-list-element',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './workspace-list-element.component.html',
  styleUrl: './workspace-list-element.component.scss',
})
export class WorkspaceListElementComponent extends WorkspaceBaseElementComponent implements OnInit{
  listItems: WritableSignal<{ id: number; text: string }[]> = signal([]);
  ID_COUNTER: number = 0;

  listForm!: FormGroup;
  entriesForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  
  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }

  toFormGroup(listEntries: { id: number; text: string }[]) {
    const group: any = {};
    group['title'] = new FormControl('', Validators.required)
    group['subtitle'] = new FormControl('', Validators.required)
    listEntries.forEach(entry => {
      group[entry.id] = new FormControl(entry.text || '', Validators.required)
    });
    return new FormGroup(group);
  }

  ngOnInit(): void {
  this.listForm = this.toFormGroup(this.listItems());
  this.onChanges();
  }

  onChanges(): void {
    this.listForm.valueChanges.subscribe(val => {
      this.workspaceContext.valid.update(() => true);
      if(this.listForm.valid){
        //prepare data and update context
        console.log(val);
      }
      this.workspaceContext.valid.update((curr) => (curr && this.listForm.valid));
    });
  }
  addItem() {
    this.listForm.addControl((this.ID_COUNTER).toString(),new FormControl('', Validators.required));
    this.listItems.set([...(this.listItems()),{
      id: this.ID_COUNTER,
      text: '',
    }]);
    this.ID_COUNTER++;
  }

  deleteItem(item: { id: number; text: string }) {
    this.listForm.removeControl(item.id.toString());
    this.listItems.set(this.listItems().filter((li) => li.id !== item.id));
  }

  deleteElement(event: any) {
    this.workspaceContext.deleteElement(this.unique_key);
  }
}
