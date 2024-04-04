import { WorkspaceItemType } from "./workspaceItemType.model";

export interface ResumeModel{
    resumeId: number | null;
    ownerId: number | null;
    components: ResumeComponentModel[];
}

export interface ResumeComponentModel{
    id: number | null;
    componentDocumentId: number;
    componentType: WorkspaceItemType;
    componentData: ComponentEntry[]
}

export interface ComponentEntry{
    id: number | null;
    label: string;
    value: string | number;
    children: ComponentChildEntry[]
}

export interface ComponentChildEntry{
    id: number | null;
    parentId: number | null;
    label: string;
    value: string | number;
}