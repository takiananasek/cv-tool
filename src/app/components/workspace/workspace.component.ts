import { ChangeDetectorRef, Component } from "@angular/core";
import { WorkspaceElementListComponent } from "../workspace-element-list/workspace-element-list.component";
import { WorkspaceMenuComponent } from "../workspace-menu/workspace-menu.component";
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatIconModule } from "@angular/material/icon";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [WorkspaceElementListComponent,
    WorkspaceMenuComponent,MatSidenavModule,FormsModule,MatCheckboxModule,MatButtonModule, NavbarComponent, MatIconModule
  ,MatToolbarModule, MatListModule],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {
  opened: boolean = true;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
