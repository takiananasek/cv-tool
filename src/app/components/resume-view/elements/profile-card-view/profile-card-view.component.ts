import { Component, Input, OnChanges, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { ResumeComponentModel } from '../../../../models/resume.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card-view',
  standalone: true,
  imports: [],
  templateUrl: './profile-card-view.component.html',
  styleUrl: './profile-card-view.component.scss'
})
export class ProfileCardViewComponent implements OnInit{
  @Input({required: true})
  componentData!:ResumeComponentModel | null;
  @Input({required: false})
  profileImageUrl!:string;
  @Input({required: false})
  backgroundImageUrl!:string;
  router = inject(Router);

  get name(){
    return this.componentData?.componentEntries.find(c => c.label === "name")?.value
  }

  get description(){
    return this.componentData?.componentEntries.find(c => c.label === "description")?.value
  }

  get job(){
    return this.componentData?.componentEntries.find(c => c.label === "jobTitle")?.value
  }

  ngOnInit(): void {
  }
}
