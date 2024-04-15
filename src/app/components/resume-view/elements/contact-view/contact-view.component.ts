import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ResumeComponentModel } from '../../../../models/resume.model';

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.scss'
})
export class ContactViewComponent implements OnInit{
  @Input({required: true})
  componentData!: ResumeComponentModel;
  phone!: string | number | null | undefined;
  email!: string | number | null | undefined;

  ngOnInit(): void {
    this.phone = this.componentData.componentEntries.find(c => c.label === 'phone')?.value;
    this.email = this.componentData.componentEntries.find(c => c.label === 'email')?.value;
  }
}
