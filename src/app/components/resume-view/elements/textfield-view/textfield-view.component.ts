import { Component, Input, OnInit } from '@angular/core';
import { ResumeComponentModel } from '../../../../models/resume.model';

@Component({
  selector: 'app-textfield-view',
  standalone: true,
  imports: [],
  templateUrl: './textfield-view.component.html',
  styleUrl: './textfield-view.component.scss'
})
export class TextfieldViewComponent implements OnInit{

  @Input({required: true})
  componentData!: ResumeComponentModel;
  @Input({required: true})
  componentDocumentId!: number;

  text: string | null | number | undefined;
  title: string | null | number | undefined;

  ngOnInit(): void {
    this.text = this.componentData.componentEntries.find(c => c.label === 'text')?.value;
   this.title = this.componentData.componentEntries.find(c => c.label === 'title')?.value;
  }
}
