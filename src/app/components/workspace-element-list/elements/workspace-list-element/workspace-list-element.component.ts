import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ComponentEntry } from '../../../../models/resume.model';
import { WorkspaceItemType } from '../../../../models/workspaceItemType.model';
import { ResumeStore } from '../../../../services/resume.store';

@Component({
  selector: 'app-workspace-list-element',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './workspace-list-element.component.html',
  styleUrl: './workspace-list-element.component.scss',
})
export class WorkspaceListElementComponent
  extends WorkspaceBaseElementComponent
  implements OnInit
{
  listItems: WritableSignal<{ id: number; text: string }[]> = signal([]);
  ID_COUNTER: number = 0;

  listForm!: FormGroup;
  readonly store = inject(ResumeStore);

  get valid() {
    if (this.listForm) {
      return this.listForm.valid;
    }
    return false;
  }

  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }

  toFormGroup(listEntries: { id: number; text: string }[]) {
    const group: any = {};
    group['title'] = new FormControl('', Validators.required);
    group['subtitle'] = new FormControl('', Validators.required);
    listEntries.forEach((entry) => {
      group[entry.id] = new FormControl(entry.text || '', Validators.required);
    });
    return new FormGroup(group);
  }

  ngOnInit(): void {
    if(this.workspaceContext.isEdit && this.editData){
      let componentEntries = this.editData.model.componentEntries;
      let title = componentEntries.find(ce => ce.label === 'title')?.value ?? '';
      let subtitle = componentEntries.find(ce => ce.label === 'subtitle')?.value ?? '';
      const group: any = {};
      group['title'] = new FormControl(title, Validators.required);
      group['subtitle'] = new FormControl(subtitle, Validators.required);
      let listItems = componentEntries.filter(ce => ce.label !== 'title' && ce.label !== 'subtitle');
      let listItemsTempl: Array<{ id: number; text: string }> = [];
      listItems.forEach(li => {
        let id = Number(li.label.split('listItem').pop());
        group[id] = new FormControl(li.value, Validators.required);
        listItemsTempl.push({
          id:id,
          text: li.value?.toString() ?? ''
        })
       this.ID_COUNTER++;
      })
      this.listForm = new FormGroup(group);
      this.listItems.set(listItemsTempl);
    }
    else{
      this.listForm = this.toFormGroup(this.listItems());
    }
    this.onChanges();
  }

  onChanges(): void {
    this.listForm.valueChanges.subscribe((val) => {
      if (this.listForm.valid) {
        this.store.deleteComponent(this.unique_key);
        this.store.addComponent({
          componentDocumentId: this.unique_key,
          componentType: WorkspaceItemType.ListElement,
          componentEntries: [
            { label: 'title', value: val.title, children: [] },
            { label: 'subtitle', value: val.subtitle, children: [] },
            ...this.mapListValues(),
          ],
        });
      }
    });
  }

  mapListValues() {
    let mapListValues: Array<ComponentEntry> = [];
    let keys = Object.keys(this.listForm.controls).filter(
      (key) => key !== 'title' && key != 'subtitle'
    );
    keys.forEach((k) => {
      let label = `listItem${k}`;
      mapListValues.push(<ComponentEntry>{
        label: label,
        value: this.listForm.controls[k].value,
        children: [],
      });
    });
    return mapListValues;
  }

  addItem() {
    this.listForm.addControl(
      this.ID_COUNTER.toString(),
      new FormControl('', Validators.required)
    );
    this.listItems.set([
      ...this.listItems(),
      {
        id: this.ID_COUNTER,
        text: '',
      },
    ]);
    this.ID_COUNTER++;
  }

  deleteItem(item: { id: number; text: string }) {
    this.listForm.removeControl(item.id.toString());
    this.listItems.set(this.listItems().filter((li) => li.id !== item.id));
  }

  deleteElement(event: any) {
    this.store.deleteComponent(this.unique_key);
    this.workspaceContext.deleteElement(this.unique_key);
  }
}
