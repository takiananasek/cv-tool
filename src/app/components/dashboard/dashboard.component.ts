import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../services/authentication.service';
import { ClipboardService } from 'ngx-clipboard';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  resumes: WritableSignal<{id: number, title: string}[]> = signal([]);

  constructor(
    private clipboard: ClipboardService,
    private resumeService: ResumeService,
    private router: Router,
    private toast: ToastService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit(){
    let userId = this.authenticationService.userValue?.id;
    //if(!userId) this.router.navigate(['/']);
    this.getResumes();
  }

  getResumes(){
    let userId = this.authenticationService.userValue?.id;
    this.resumeService.getUserResumes(Number(userId)).subscribe(
      (data) => {
        this.resumes.set(data.resumes);
      }
    );
  }

  deleteResume(id: number){
    this.resumeService.deleteResume(id).subscribe(res => {
      this.toast.success(
        "Successfully deleted", ""
      );
      this.getResumes();
    });
  }

  openResume(id: number){
    let link = `${environment.redirectUri}resume?id=${id}`;
    window.open(link, "_blank");
  }

  copyResumeLink(id: number){
    let link = `${environment.redirectUri}resume?id=${id}`;
    this.clipboard.copy(link);
  }
}
