import { Routes } from '@angular/router';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ResumeViewComponent } from './components/resume-view/resume-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';

export const routes: Routes = [
    {path: 'workspace', component: WorkspaceComponent, providers: [ToastrModule]},
    {path: 'home', component: MainPageComponent},
    {path: 'resume/:id', component: ResumeViewComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '**', component: MainPageComponent},
];
