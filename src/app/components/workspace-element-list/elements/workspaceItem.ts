import { Type } from '@angular/core';
import { WorkspaceEmptyElementComponent } from './workspace-empty-element/workspace-empty-element.component';
import { WorkspaceListElementComponent } from './workspace-list-element/workspace-list-element.component';
import { WorkspaceTextfieldElementComponent } from './workspace-textfield-element/workspace-textfield-element.component';
import { WorkspaceTitleElementComponent } from './workspace-title-element/workspace-title-element.component';
import { WorkspaceProfileCardComponent } from './workspace-profile-card/workspace-profile-card.component';
import { WorkspaceProjectLinksComponent } from './workspace-project-links/workspace-project-links.component';
import { WorkspaceItemType } from '../../../models/workspaceItemType.model';
import { WorkspaceContactformElementComponent } from './workspace-contactform-element/workspace-contactform-element.component';

export type WorkspaceElementComponent =
  | WorkspaceEmptyElementComponent
  | WorkspaceListElementComponent
  | WorkspaceTitleElementComponent
  | WorkspaceProfileCardComponent
  | WorkspaceProjectLinksComponent
  | WorkspaceContactformElementComponent
  | WorkspaceEmptyElementComponent;

export class WorkspaceItem {
  componentyTypeMapping = new Map([
    [WorkspaceItemType.ListElement, WorkspaceListElementComponent],
    [WorkspaceItemType.TextFieldElement, WorkspaceTextfieldElementComponent],
    [WorkspaceItemType.TitleElement, WorkspaceTitleElementComponent],
    [WorkspaceItemType.ProfileCardElement, WorkspaceProfileCardComponent],
    [WorkspaceItemType.ProjectLinksElement, WorkspaceProjectLinksComponent],
    [WorkspaceItemType.ContactElement, WorkspaceContactformElementComponent],
    [WorkspaceItemType.Empty, WorkspaceEmptyElementComponent],
  ]);

  component: Type<WorkspaceElementComponent>;

  constructor(public itemType: WorkspaceItemType) {
    this.component =
      this.componentyTypeMapping.get(itemType) ??
      WorkspaceEmptyElementComponent;
  }
}
