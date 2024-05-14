import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ComponentChildEntry,
  ComponentEntry,
} from '../../../../models/resume.model';
import { WorkspaceItemType } from '../../../../models/workspaceItemType.model';
import { ResumeStore } from '../../../../services/resume.store';

@Component({
  selector: 'app-workspace-project-links',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './workspace-project-links.component.html',
  styleUrl: './workspace-project-links.component.scss',
})
export class WorkspaceProjectLinksComponent
  extends WorkspaceBaseElementComponent
  implements OnInit
{
  listItems: WritableSignal<
    { id: number; title: string; description: string; url: string }[]
  > = signal([]);
  ID_COUNTER: number = 0;
  listForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
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

  ngOnInit(): void {
    this.listForm = this.formBuilder.group({});
    this.onChanges();
    if (this.workspaceContext.isEdit && this.editData) {
      let componentEntries = this.editData.model.componentEntries;
      let listItems: Array<{ id: number; title: string; description: string; url: string }> = [];
      componentEntries.forEach(ce => {
        this.listForm.addControl(
          this.ID_COUNTER.toString(),
          new FormGroup({
            title: new FormControl((ce.children.find(ch => ch.label === 'title')?.value.toString() ?? ''), Validators.required),
            description: new FormControl((ce.children.find(ch => ch.label === 'description')?.value.toString() ?? ''), Validators.required),
            url: new FormControl((ce.children.find(ch => ch.label === 'url')?.value.toString() ?? ''), Validators.required),
          })
        );
        listItems.push({
          id: Number(ce.label.split("ProjectEntry").pop()),
          title: ce.children.find(ch => ch.label === 'title')?.value.toString() ?? '',
          description: ce.children.find(ch => ch.label === 'description')?.value.toString() ?? '',
          url: ce.children.find(ch => ch.label === 'url')?.value.toString() ?? '',
        })
        this.ID_COUNTER++;
      })
      this.listItems.set(listItems);
      this.store.deleteComponent(this.unique_key);
        this.store.addComponent({
          componentDocumentId: this.unique_key,
          componentType: WorkspaceItemType.ProjectLinksElement,
          componentEntries: [...this.mapListValues()],
        });
    }
  }

  onChanges(): void {
    this.listForm.valueChanges.subscribe((val) => {
      if (this.listForm.valid) {
        this.store.deleteComponent(this.unique_key);
        this.store.addComponent({
          componentDocumentId: this.unique_key,
          componentType: WorkspaceItemType.ProjectLinksElement,
          componentEntries: [...this.mapListValues()],
        });
      }
    });
  }

  mapListValues() {
    let componentEntries: Array<ComponentEntry> = [];
    let controlsKeys = Object.keys(this.listForm.controls);
    controlsKeys.forEach((controlKey) => {
      let control: any = this.listForm.controls[controlKey];
      let componentDataEntry: ComponentEntry = {
        label: `ProjectEntry${controlKey}`,
        value: null,
        children: this.mapChildren(control.controls),
      };
      componentEntries.push(componentDataEntry);
    });
    return componentEntries;
  }

  mapChildren(controls: any) {
    let children: Array<ComponentChildEntry> = [];
    [];
    let controlsKeys = Object.keys(controls);
    controlsKeys.forEach((key: string) => {
      let control = controls[key];
      children.push(<ComponentChildEntry>{
        label: key,
        value: control.value,
      });
    });
    return children;
  }

  addProjectItem() {
    this.listForm.addControl(
      this.ID_COUNTER.toString(),
      new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        url: new FormControl('', Validators.required),
      })
    );

    this.listItems.set([
      ...this.listItems(),
      {
        id: this.ID_COUNTER,
        title: '',
        description: '',
        url: '',
      },
    ]);
    this.ID_COUNTER++;
  }

  deleteProjectItem(item: {
    id: number;
    title: string;
    description: string;
    url: string;
  }) {
    this.listForm.removeControl(item.id.toString());
    this.listItems.set(this.listItems().filter((li) => li.id !== item.id));
    this.ID_COUNTER--;
  }

  deleteElement(event: any) {
    this.store.deleteComponent(this.unique_key);
    this.workspaceContext.deleteElement(this.unique_key);
  }
}
