import { Routes } from '@angular/router';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ResumeViewComponent } from './components/resume-view/resume-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './helpers/authGuard';
//TODO: Auth guard based on user context, session management 
export const routes: Routes = [
    {path: 'workspace', component: WorkspaceComponent, providers: [ToastrModule], canActivate: [AuthGuard]},
    {path: 'home', component: MainPageComponent},
    {path: 'resume/:id', component: ResumeViewComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: '**', component: MainPageComponent},
];
