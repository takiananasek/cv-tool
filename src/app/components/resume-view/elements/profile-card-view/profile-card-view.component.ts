import { Component, Input, OnInit, Signal, WritableSignal, computed, signal } from '@angular/core';
import { ResumeComponentModel } from '../../../../models/resume.model';

@Component({
  selector: 'app-profile-card-view',
  standalone: true,
  imports: [],
  templateUrl: './profile-card-view.component.html',
  styleUrl: './profile-card-view.component.scss'
})
export class ProfileCardViewComponent implements OnInit{
  @Input({required: true})
  componentDataInput!:ResumeComponentModel;

  get name(){
    return this.componentDataInput?.componentEntries.find(c => c.label === "name")?.value
  }

  get description(){
    return this.componentDataInput?.componentEntries.find(c => c.label === "description")?.value
  }

  get job(){
    return this.componentDataInput?.componentEntries.find(c => c.label === "jobTitle")?.value
  }

  ngOnInit(): void {
  }
}
