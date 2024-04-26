import { WorkspaceItemType } from "./workspaceItemType.model";

export interface ResumeModel{
   // resumeId: number | null;
    ownerId: number | null;
    profileImageMetadataName: string |null;
    backgroundImageMetadataName : string |null;
    title: string | null;
    components: ResumeComponentModel[];
}

export interface ResumeComponentModel{
  //  id: number | null; //id komponentu ogolnie
    componentDocumentId: number; //ktory jest w dokumencie - sluzy do usuwania danych
    componentType: WorkspaceItemType; //jaki to jest komponent
    componentEntries: ComponentEntry[] //dane z komponentow
}

export interface ComponentEntry{
    //id: number | null; //jakis ID z bazki
    label: string; //label danej
    value: string | number | null;
    children: ComponentChildEntry[]
}

export interface ComponentChildEntry{
  //  id: number | null; //jakis id z bazki
   // parentId: number | null; // foregin key do id z ComponentEntry
    label: string; 
    value: string | number;
}