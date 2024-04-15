import { LeadingComment } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ResumeComponentModel } from '../../../../models/resume.model';

@Component({
  selector: 'app-title-view',
  standalone: true,
  imports: [],
  templateUrl: './title-view.component.html',
  styleUrl: './title-view.component.scss'
})
export class TitleViewComponent implements OnInit{

  @Input({required:true})
  componentData!: ResumeComponentModel;

  title: string | number | null | undefined;

  ngOnInit(): void {
    this.title = this.componentData.componentEntries.find(c => c.label === 'title')?.value;
  }
}
