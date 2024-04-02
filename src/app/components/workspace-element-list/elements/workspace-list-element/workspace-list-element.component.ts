import { Component } from '@angular/core';
import { WorkspaceBaseElementComponent } from '../workspace-base-element/workspace-base-element.component';
import { WorkspaceContext } from '../../../../services/workspace-context';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workspace-list-element',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,MatButtonModule,MatIconModule],
  templateUrl: './workspace-list-element.component.html',
  styleUrl: './workspace-list-element.component.scss'
})
export class WorkspaceListElementComponent extends WorkspaceBaseElementComponent{
  listItems: {id: number, text: string}[] = [];
  ID_COUNTER: number = 0;

  constructor(public workspaceContext: WorkspaceContext){
    super(workspaceContext);
  }

  addItem(){
    this.listItems.push({
      id: this.ID_COUNTER,
      text: ""
    })
    this.ID_COUNTER++;
  }

  deleteItem(item: {id: number, text: string}){
    this.listItems = this.listItems.filter(li => li.id !== item.id);
    this.ID_COUNTER--;
  }
}
