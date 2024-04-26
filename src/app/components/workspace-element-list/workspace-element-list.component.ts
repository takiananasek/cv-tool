import {
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { WorkspaceContext } from '../../services/workspace-context';
import { Subscription } from 'rxjs';
import { WorkspaceItem } from './elements/workspaceItem';
import { WorkspaceItemType } from '../../models/workspaceItemType.model';
import { WorkspaceProfileCardComponent } from './elements/workspace-profile-card/workspace-profile-card.component';
import { ResumeStore } from '../../services/resume.store';

@Component({
  selector: 'app-workspace-element-list',
  standalone: true,
  imports: [WorkspaceProfileCardComponent],
  templateUrl: './workspace-element-list.component.html',
  styleUrl: './workspace-element-list.component.scss',
})
export class WorkspaceElementListComponent implements OnInit, OnDestroy{
  @ViewChild('parent', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;
  @ViewChild('profileCard')
  profileCardRef!: any;

  child_unique_key: number = 0;
  elementAddSubscription!: Subscription;
  elementDeleteSubscription!: Subscription;

  constructor(private workspaceContext: WorkspaceContext) {
  }

  ngOnInit() {
    this.workspaceContext.componentsReferences = [];
    this.elementAddSubscription =
      this.workspaceContext.elementsUpdated$.subscribe((workspaceItemType) =>
        this.add(workspaceItemType)
      );
    this.elementDeleteSubscription =
      this.workspaceContext.elementDeleted$.subscribe((unique_key) =>
        this.remove(unique_key)
      );
  }

  ngOnDestroy(){
    this.elementDeleteSubscription.unsubscribe();
    this.elementAddSubscription.unsubscribe();
  }

  ngAfterViewInit(){
    this.workspaceContext.profileCard = this.profileCardRef;
  }

  add(workspaceItemType: WorkspaceItemType) {
    if (workspaceItemType !== undefined) {
      let workspaceItem = new WorkspaceItem(workspaceItemType);
      const childComponentRef = this.viewContainerRef?.createComponent(
        workspaceItem.component
      );
      let childComponent = childComponentRef?.instance;
      if(childComponent){
        childComponent.unique_key = ++this.child_unique_key;
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
        componentRef.hostView as any
      );
      this.viewContainerRef.remove(vcrIndex);

      this.workspaceContext.componentsReferences = this.workspaceContext.componentsReferences.filter(
        (x) => x.instance.unique_key !== key
      );
    }
  }
}
