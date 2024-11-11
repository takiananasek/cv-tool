import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { WorkspaceContext } from '../../services/workspace-context';
import { Subscription, map } from 'rxjs';
import { WorkspaceItem } from './elements/workspaceItem';
import { WorkspaceItemType } from '../../models/workspaceItemType.model';
import { WorkspaceProfileCardComponent } from './elements/workspace-profile-card/workspace-profile-card.component';
import { ResumeComponentModel } from '../../models/resume.model';

@Component({
  selector: 'app-workspace-element-list',
  standalone: true,
  imports: [WorkspaceProfileCardComponent],
  templateUrl: './workspace-element-list.component.html',
  styleUrl: './workspace-element-list.component.scss',
})
export class WorkspaceElementListComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('parent', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  @ViewChild('profileCard')
  profileCardRef!: WorkspaceProfileCardComponent;

  child_unique_key: number = 0;
  elementAddSubscription!: Subscription;
  elementDeleteSubscription!: Subscription;
  isEdit: boolean = false;
  resumeId!: number;
  @Input()profileCardData!: ResumeComponentModel;
  @Input()componentData!: ResumeComponentModel[];

  constructor(
    private workspaceContext: WorkspaceContext,
  ) {}

  ngOnInit() {    
    this.workspaceContext.componentsReferences = [];
    this.elementAddSubscription =
      this.workspaceContext.elementsUpdated$.subscribe((workspaceItemType) =>
        this.add(workspaceItemType, false, null)
      );
    this.elementDeleteSubscription =
      this.workspaceContext.elementDeleted$.subscribe((unique_key) =>
        this.remove(unique_key)
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workspaceContext.isEdit) {
      if(this.componentData){
        this.workspaceContext.profileEditData = this.profileCardData;
        let id = 0;
        this.componentData.forEach(c => {
          this.add(c.componentType, true, {id: id, model: c});
          id++;
        })
      }
    }
  }

  ngOnDestroy() {
    this.elementDeleteSubscription.unsubscribe();
    this.elementAddSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.workspaceContext.profileCard = this.profileCardRef
  }

  add(workspaceItemType: WorkspaceItemType, isEdit: boolean, data: {id: number, model: ResumeComponentModel} | null) {
    if (workspaceItemType !== undefined) {
      let workspaceItem = new WorkspaceItem(workspaceItemType);
      const childComponentRef = this.viewContainerRef?.createComponent(
        workspaceItem.component
      );
      let childComponent = childComponentRef?.instance;
      if (childComponent) {
        childComponent.unique_key = ++this.child_unique_key;
        if(isEdit){
          childComponent.editData = data;
        }
        this.workspaceContext.componentsReferences.push(childComponentRef);
      }
    }
  }

  remove(key: number) {
    if (key) {
      if (this.viewContainerRef.length < 1) return;

      let componentRef = this.workspaceContext.componentsReferences.filter(
        (x) => x.instance.unique_key == key
      )[0];

      let vcrIndex: number = this.viewContainerRef.indexOf(
        componentRef.hostView as ViewRef
      );
      this.viewContainerRef.remove(vcrIndex);

      this.workspaceContext.componentsReferences =
        this.workspaceContext.componentsReferences.filter(
          (x) => x.instance.unique_key !== key
        );
    }
  }
}
