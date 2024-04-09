import { Component, Input, OnInit } from '@angular/core';
import { ResumeComponentModel } from '../../../../models/resume.model';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
})
export class ListViewComponent implements OnInit {
  @Input({ required: true })
  componentData!: ResumeComponentModel;
  listItems: string[] = [];
  title: string | number | null | undefined;
  subtitle: string | number | null | undefined;

  ngOnInit(): void {
    this.title = this.componentData.componentEntries.find(c => c.label === 'title')?.value;
   this.subtitle = this.componentData.componentEntries.find(c => c.label === 'subtitle')?.value;
   this.componentData.componentEntries.filter(c => c.label.includes('listItem'))
   .map(ce =>{
     if(ce.value){
       this.listItems.push(ce.value.toString());
     }
   })
  }
}
