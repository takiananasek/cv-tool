import { Component } from '@angular/core';
import { WorkspaceContext } from '../../services/workspace-context';
import { WorkspaceItemType } from '../../models/workspaceItemType';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-workspace-menu',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatTooltipModule],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent {

  itemTypes = WorkspaceItemType;
  constructor(private workspaceContext: WorkspaceContext){
  }

  addElement(itemType: WorkspaceItemType){
    this.workspaceContext.addElement(itemType);
  }
}
