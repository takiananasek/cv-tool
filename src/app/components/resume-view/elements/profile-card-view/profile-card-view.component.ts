import { Component, Input, OnInit } from '@angular/core';
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
  componentData!: ResumeComponentModel;
  name!: string | number| null | undefined;
  job!: string | number | null | undefined;
  description!: string | number | null | undefined;

  ngOnInit(): void {
   this.name = this.componentData.componentEntries.find(c => c.label === "name")?.value;
   this.job = this.componentData.componentEntries.find(c => c.label === "jobTitle")?.value;
    this.description = this.componentData.componentEntries.find(c => c.label === "description")?.value;
  }
}
