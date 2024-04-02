import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkspaceItemType } from '../models/workspaceItemType';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceContext {

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
