import {
  ComponentRef,
  Injectable,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { WorkspaceItemType } from '../models/workspaceItemType.model';
import { ResumeModel } from '../models/resume.model';
import { MatDialog } from '@angular/material/dialog';
import { OnsaveDialogComponent } from '../components/dialog/onsave-dialog/onsave-dialog.component';
import { InvalidFormDialogComponent } from '../components/dialog/invalid-form-dialog/invalid-form-dialog.component';
import { ResumeService } from './resume.service';
import { AftersaveDialogComponent } from '../components/dialog/aftersave-dialog/aftersave-dialog.component';
import { ResumeStore } from './resume.store';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceContext {
  isEdit: boolean = false;
  profileEditData: any;
  resumeId!: number;
  profileCard!: any;
  componentsReferences = Array<ComponentRef<any>>();

  elementsUpdated$: Subject<any> = new Subject();
  elementDeleted$: Subject<any> = new Subject();
  private store = inject(ResumeStore);
  backgroundImageMetadataName: Signal<string|null> = computed(() => this.store.backgroundImageMetadataName());
  profileImageMetadataName: Signal<string|null> = computed(() => this.store.profileImageMetadataName());

  constructor(
    public dialog: MatDialog,
    private resumeService: ResumeService,
    private authService: AuthenticationService
  ) {}

  addElement(itemType: WorkspaceItemType) {
    this.elementsUpdated$.next(itemType);
  }

  deleteElement(unique_key: number) {
    this.elementDeleted$.next(unique_key);
  }

  reset(){
    this.profileCard = null;
    this.componentsReferences = [];
    this.isEdit = false;
    this.profileEditData = null;
    this.store.updateProfileIMageMetadataName(null);
    this.store.updateBackgroundImageMetadataName(null);
  }

  onSave() {
    let valid = true;
    this.componentsReferences.forEach((c) => {
      valid = c.instance.valid && valid;
    });
    valid = valid && this.profileCard.valid;
    if (valid) {
      let dialogRef = this.dialog.open(OnsaveDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'Ok') {
          if (!this.isEdit) {
            const payload = <ResumeModel>{
              ownerId: this.authService.userValue?.id,
              backgroundImageMetadataName:
                this.store.backgroundImageMetadataName(),
              profileImageMetadataName: this.store.profileImageMetadataName(),
              title: this.store.title(),
              components: this.store.components(),
            };
            this.resumeService.addResume(payload).subscribe((data) => {
              this.dialog.open(AftersaveDialogComponent, {
                data: { id: data.resumeId },
              });
            });
          } else {
            const payload = <ResumeModel>{
              id: this.resumeId,
              backgroundImageMetadataName:
                this.store.backgroundImageMetadataName(),
              profileImageMetadataName: this.store.profileImageMetadataName(),
              title: this.store.title(),
              components: this.store.components(),
            };
            this.resumeService.editResume(payload).subscribe((data) => {
              this.dialog.open(AftersaveDialogComponent, {
                data: { id: data.resumeId },
              });
            });
          }
        }
      });
    } else {
      let dialogRef = this.dialog.open(InvalidFormDialogComponent);
    }
  }
}
