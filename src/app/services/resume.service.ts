import {
    ComponentRef,
    Injectable,
    WritableSignal,
    signal,
  } from '@angular/core';
  import { BehaviorSubject, Observable } from 'rxjs';
  import { WorkspaceItemType } from '../models/workspaceItemType.model';
  import { ResumeModel } from '../models/resume.model';
  import { MatDialog } from '@angular/material/dialog';
  import { OnsaveDialogComponent } from '../components/dialog/onsave-dialog/onsave-dialog.component';
  import { InvalidFormDialogComponent } from '../components/dialog/invalid-form-dialog/invalid-form-dialog.component';
import { HttpClient } from '@angular/common/http';
  
  @Injectable({
    providedIn: 'root',
  })
  export class ResumeService {
    constructor(private httpClient: HttpClient) {} 
    getResume(id: number): Observable<ResumeModel>{
        return this.httpClient.post<ResumeModel>("url", { id: id });
    }
  }
  