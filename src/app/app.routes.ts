import { Routes } from '@angular/router';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MainPageComponent } from './components/main-page/main-page.component';

export const routes: Routes = [
    {path: 'workspace', component: WorkspaceComponent},
    {path: 'home', component: MainPageComponent},
    {path: '**', component: MainPageComponent},
];
