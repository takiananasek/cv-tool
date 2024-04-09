import { Type } from "@angular/core";
import { WorkspaceItemType } from "../../../models/workspaceItemType.model";
import { ListViewComponent } from "./list-view/list-view.component";
import { TextfieldViewComponent } from "./textfield-view/textfield-view.component";
import { TitleViewComponent } from "./title-view/title-view.component";
import { ProfileCardViewComponent } from "./profile-card-view/profile-card-view.component";
import { ProjectLinksViewComponent } from "./project-links-view/project-links-view.component";
import { ContactViewComponent } from "./contact-view/contact-view.component";
import { EmptyViewComponent } from "./empty-view/empty-view.component";

export class ResumeViewItem{
    componentyTypeMapping = new Map([
        
        [WorkspaceItemType.ListElement, ListViewComponent],
        [WorkspaceItemType.TextFieldElement, TextfieldViewComponent],
        [WorkspaceItemType.TitleElement, TitleViewComponent],
        [WorkspaceItemType.ProfileCardElement, ProfileCardViewComponent],
        [WorkspaceItemType.ProjectLinksElement, ProjectLinksViewComponent],
        [WorkspaceItemType.ContactElement, ContactViewComponent],
        [WorkspaceItemType.Empty, EmptyViewComponent],
    ]);

    component: Type<any>;

    constructor(public itemType: WorkspaceItemType){
        this.component = this.componentyTypeMapping.get(itemType) ?? EmptyViewComponent;
    }
}