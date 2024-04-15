import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient, private toastService: ToastService) {}
  serviceName = 'Files';

  uploadFile = (file: any) => {
    let fileToUpload = <File>file;
    const formData = new FormData();
    formData.append('file', fileToUpload);
    
    this.http.post(`${environment.baseUrl}${this.serviceName}/upload/`, formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
         if (event.type === HttpEventType.Response) {
          this.toastService.success("Successfully uploaded image.", "");
        }
      },
      //toast error
      error: (err: HttpErrorResponse) => this.toastService.error("Error occurred while saving the image.", "")
    });
  }
}
