import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkspaceItemType } from '../models/workspaceItemType.model';
import { ResumeModel } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceContext {

  valid: WritableSignal<boolean> = signal(false);
  resume: ResumeModel = {
    resumeId: null,
    ownerId: null,
    components:[]
  };

  elementsUpdated$: BehaviorSubject<any> = new BehaviorSubject(null);
  elementDeleted$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  addElement(itemType: WorkspaceItemType){
    this.elementsUpdated$.next(itemType);
  }

  deleteElement(unique_key: number){
    this.elementDeleted$.next(unique_key);
  }
}
