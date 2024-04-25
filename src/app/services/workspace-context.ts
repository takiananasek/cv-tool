import {
  ComponentRef,
  Injectable,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  profileCard!: any;
  componentsReferences = Array<ComponentRef<any>>();
  // resume: WritableSignal<ResumeModel> = signal({
  //   profileImageMetadataId: null,
  //   backgroundImageMetadataId: null,
  //   title: null,
  //   ownerId: null,
  //   components: [],
  // });
  // resumeProfileFile: WritableSignal<FormData | null> = signal(null);
  // backgroundProfileFile: WritableSignal<string | null> = signal(null);

  elementsUpdated$: BehaviorSubject<any> = new BehaviorSubject(null);
  elementDeleted$: BehaviorSubject<any> = new BehaviorSubject(null);
  private store = inject(ResumeStore);

  constructor(public dialog: MatDialog, private resumeService: ResumeService, private authService: AuthenticationService) {}

  addElement(itemType: WorkspaceItemType) {
    this.elementsUpdated$.next(itemType);
  }

  deleteElement(unique_key: number) {
    this.elementDeleted$.next(unique_key);
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
        if (result === 'Ok'){  
          const payload = <ResumeModel>{
            ownerId: this.authService.userValue?.id,
            backgroundImageMetadataName: this.store.backgroundImageMetadataName(),
            profileImageMetadataName: this.store.profileImageMetadataName(),
            title: this.store.title(),
            components: this.store.components()
          }
          this.resumeService.addResume(payload).subscribe(data =>{
            this.dialog.open(AftersaveDialogComponent, {data:{id: data.resumeId}});
          });
        } 
      });
    } else {
      let dialogRef = this.dialog.open(InvalidFormDialogComponent);
    }
  }
}
