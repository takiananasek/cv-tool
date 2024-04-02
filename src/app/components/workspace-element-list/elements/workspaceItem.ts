import { Type } from "@angular/core";
import { WorkspaceItemType } from "../../../models/workspaceItemType";
import { WorkspaceContactElementComponent } from "./workspace-contact-element/workspace-contact-element.component";
import { WorkspaceListElementComponent } from "./workspace-list-element/workspace-list-element.component";
import { WorkspaceTextfieldElementComponent } from "./workspace-textfield-element/workspace-textfield-element.component";
import { WorkspaceTitleElementComponent } from "./workspace-title-element/workspace-title-element.component";
import { WorkspaceProfileCardComponent } from "./workspace-profile-card/workspace-profile-card.component";
import { WorkspaceProjectLinksComponent } from "./workspace-project-links/workspace-project-links.component";

export class WorkspaceItem{
    componentyTypeMapping = new Map([
        [WorkspaceItemType.ContactElement, WorkspaceContactElementComponent],
        [WorkspaceItemType.ListElement, WorkspaceListElementComponent],
        [WorkspaceItemType.TextFieldElement, WorkspaceTextfieldElementComponent],
        [WorkspaceItemType.TitleElement, WorkspaceTitleElementComponent],
        [WorkspaceItemType.ProfileCardElement, WorkspaceProfileCardComponent],
        [WorkspaceItemType.ProjectLinksElement, WorkspaceProjectLinksComponent],
    ]);

    component: Type<any>;

    constructor(public itemType: WorkspaceItemType){
        this.component = this.componentyTypeMapping.get(itemType) ?? WorkspaceTextfieldElementComponent;
    }
}