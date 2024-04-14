import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  userId: number = 1;
  resumes: WritableSignal<number[]> = signal([]);

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private router: Router
  ) {}

  ngOnInit(){
    this.resumeService.getUserResumes(this.userId).subscribe(
      (data) => {
        this.resumes.set(data.ids);
      }
    );
  }

  getResumeLink(resume: number){
    return `${environment.redirectUri}Resume/${resume}`;
  }
}
