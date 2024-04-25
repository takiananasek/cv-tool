import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { ResumeModel } from '../models/resume.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  constructor(private http: HttpClient) {}
  serviceName = 'Resume';

  getResume(id: number): Observable<ResumeModel> {
    return this.http
      .post<ResumeModel>(`${environment.baseUrl}${this.serviceName}/get/`, {
        id: id,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deleteResume(id: number) {
    return this.http
      .post<{}>(`${environment.baseUrl}${this.serviceName}/delete/`, {
        id: id,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getUserResumes(userId: number): Observable<{resumes: [{ id: number, title: string }]}> {
    return this.http
      .post<{resumes: [{id: number, title: string}]}>(`${environment.baseUrl}${this.serviceName}/getByUser/`, {
        userId: userId,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  addResume(resume: ResumeModel): Observable<{resumeId: number}> {
    return this.http
      .post<{resumeId: number}>(`${environment.baseUrl}${this.serviceName}/add/`, resume)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
