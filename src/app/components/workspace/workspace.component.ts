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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public workspaceContext: WorkspaceContext,
    public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    this.opened.update(() => this.nav.opened);
  }

  toggeNavBar() {
    this.nav.toggle();
    this.opened.update((c) => !c);
  }

  onSaveClick(){
    if(this.workspaceContext.valid()){

    }
    else{
      //display invalid popup
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InvalidFormDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
}
