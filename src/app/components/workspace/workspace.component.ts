import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Signal,
  ViewChild,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { WorkspaceElementListComponent } from '../workspace-element-list/workspace-element-list.component';
import { WorkspaceMenuComponent } from '../workspace-menu/workspace-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { WorkspaceContext } from '../../services/workspace-context';
import { MatDialog } from '@angular/material/dialog';
import { InvalidFormDialogComponent } from '../dialog/invalid-form-dialog/invalid-form-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { map } from 'rxjs';
import { ResumeComponentModel } from '../../models/resume.model';
import { WorkspaceItemType } from '../../models/workspaceItemType.model';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    WorkspaceElementListComponent,
    WorkspaceMenuComponent,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonModule,
    NavbarComponent,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
})
export class WorkspaceComponent implements AfterViewInit {
  @ViewChild('snav') nav!: MatSidenav;
  opened: WritableSignal<boolean> = signal(false);
  overflow: Signal<any> = computed(() => {
    if (this.opened()) return 'hidden';
    else return '';
  });

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  resumeId!: number;
  profileCardData!: ResumeComponentModel;
  componentData!: ResumeComponentModel[];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public workspaceContext: WorkspaceContext,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private resumeService: ResumeService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    if (
      this.route.snapshot.queryParams['id'] &&
      this.route.snapshot.queryParams['edit']
    ) {
      this.workspaceContext.isEdit = true;
      this.resumeId = Number(this.route.snapshot.queryParams['id']);
      this.workspaceContext.resumeId = this.resumeId;

      this.resumeService
        .getResume(this.resumeId)
        .pipe(
          map((data) => {
            this.componentData = data.components
              .filter(
                (c) => c.componentType !== WorkspaceItemType.ProfileCardElement
              )
              .sort((a, b) => a.componentDocumentId - b.componentDocumentId);
            this.profileCardData = data.components.filter(
              (c) => c.componentType === WorkspaceItemType.ProfileCardElement
            )[0];
          })
        )
        .subscribe();
    } else {
      this.workspaceContext.isEdit = false;
    }
  }

  ngAfterViewInit() {
    this.opened.update(() => this.nav.opened);
  }

  toggeNavBar() {
    this.nav.toggle();
    this.opened.update((c) => !c);
  }

  onSaveClick() {
    this.workspaceContext.onSave();
  }

  openFailedDialog(): void {
    const dialogRef = this.dialog.open(InvalidFormDialogComponent, {
      data: {},
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
