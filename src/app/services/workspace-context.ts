import {
  ComponentRef,
  Injectable,
  WritableSignal,
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

@Injectable({
  providedIn: 'root',
})
export class WorkspaceContext {
  profileCard!: any;
  componentsReferences = Array<ComponentRef<any>>();
  resume: WritableSignal<ResumeModel> = signal({
    title: null,
    ownerId: null,
    components: [],
  });

  elementsUpdated$: BehaviorSubject<any> = new BehaviorSubject(null);
  elementDeleted$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public dialog: MatDialog, private resumeService: ResumeService) {}

  addElement(itemType: WorkspaceItemType) {
    this.elementsUpdated$.next(itemType);
  }

  deleteElement(unique_key: number) {
    this.elementDeleted$.next(unique_key);
  }

  onSave() {
    //TODO: Save file, then save resume
    
    console.log(this.resume());
    let valid = true;
    this.componentsReferences.forEach((c) => {
      valid = c.instance.valid && valid;
    });
    valid = valid && this.profileCard.valid;
    if (valid) {
      let dialogRef = this.dialog.open(OnsaveDialogComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'Ok'){
          this.resumeService.addResume(this.resume()).subscribe(data =>{
            this.dialog.open(AftersaveDialogComponent, {data:{id: data.resumeId}});
          });
        } 
      });
    } else {
      let dialogRef = this.dialog.open(InvalidFormDialogComponent);
    }
  }
}
