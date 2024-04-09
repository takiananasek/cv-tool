import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ResumeComponentModel } from '../../../../models/resume.model';

@Component({
  selector: 'app-project-links-view',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './project-links-view.component.html',
  styleUrl: './project-links-view.component.scss',
})
export class ProjectLinksViewComponent implements OnInit {
  @Input({ required: true })
  componentData!: ResumeComponentModel;
  listItems: {
    title: string;
    desc: string;
    url: string;
  }[] = [];

  constructor(){
  }

  ngOnInit(): void {
   this.componentData.componentEntries.map(ce=>{
     let item = {title: '', desc: '', url: ''}
     item.title = ce.children.find(ch => ch.label === 'title')?.label ?? '';
     item.desc = ce.children.find(ch => ch.label === 'description')?.label ?? '';
     item.url = ce.children.find(ch => ch.label === 'url')?.label ?? '';
      this.listItems.push(item);
   });
  }

  navigateToProject(url: string){
      window.open(url, '_blank');
  }
}
