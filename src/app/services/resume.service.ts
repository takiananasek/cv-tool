import {
    Injectable,
  } from '@angular/core';
  import { BehaviorSubject, Observable } from 'rxjs';
  import { ResumeModel } from '../models/resume.model';
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
  