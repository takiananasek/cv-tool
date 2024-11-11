import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WorkspaceItemType } from '../../../../models/workspaceItemType.model';
import { ResumeStore } from '../../../../services/resume.store';

@Component({
  selector: 'app-workspace-contactform-element',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './workspace-contactform-element.component.html',
  styleUrl: './workspace-contactform-element.component.scss',
})
export class WorkspaceContactformElementComponent
  extends WorkspaceBaseElementComponent
  implements OnInit
{
  readonly store = inject(ResumeStore);
  contactForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  constructor(public workspaceContext: WorkspaceContext) {
    super(workspaceContext);
  }

  get valid() {
    if (this.contactForm) {
      return this.contactForm.valid;
    }
    return false;
  }

  deleteElement() {
    this.store.deleteComponent(this.unique_key);
    this.workspaceContext.deleteElement(this.unique_key);
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
    this.onChanges();
    if (this.workspaceContext.isEdit && this.editData) {
      let phone = this.workspaceContext.isEdit
        ? this.editData.model.componentEntries.find(
            (ce) => ce.label === 'phone'
          )?.value
        : '';
      let email = this.workspaceContext.isEdit
        ? this.editData.model.componentEntries.find((ce) => ce.label === 'email')
            ?.value
        : '';
      this.contactForm?.patchValue({
        phone: phone,
        email: email,
      });
    }
  }

  onChanges(): void {
    this.contactForm.valueChanges.subscribe((val) => {
      if (this.contactForm.valid) {
        this.store.deleteComponent(this.unique_key);
        this.store.addComponent({
          componentDocumentId: this.unique_key,
          componentType: WorkspaceItemType.ContactElement,
          componentEntries: [
            { label: 'phone', value: val.phone, children: [] },
            { label: 'email', value: val.email, children: [] },
          ],
        });
      }
    });
  }
}
