import { Routes } from '@angular/router';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ResumeViewComponent } from './components/resume-view/resume-view.component';

export const routes: Routes = [
    {path: 'workspace', component: WorkspaceComponent},
    {path: 'home', component: MainPageComponent},
    {path: 'resume/:id', component: ResumeViewComponent},
    {path: '**', component: MainPageComponent},
];
