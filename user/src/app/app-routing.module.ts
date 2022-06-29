import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotosListComponent } from './components/cmpt1-land/photos-list.component'
import { LoginComponent } from './components/cmpt5-login/login.component';
import { PhotoPreviewComponent } from './components/cmpt7-curse-preview/curse-preview.component'
import { UserPreviewComponent } from './components/cmpt4-user-preview/user-preview.component';
import { UserComponent } from './components/cmpt3-user-register/user.component';
import { LandComponent } from "./components/cmpt2-users/land.component";
import { AsignatureComponent } from "./components/cmpt6-curse/asignature.component";
import { TasksComponent } from "./components/cmpt11-tasks/tasks.component";

import { ThemePreviewComponent } from './components/cmpt10-theme-preview/theme-preview.component'
import { UnityPreviewComponent } from './components/cmpt9-unity-preview/unity-preview.component'
import { TaskPreviewComponent } from './components/cmpt12-task-preview/task-preview.component'
import { UsersCurseComponent } from './components/cmpt8-integer/integer.component'
import { FileComponent } from './components/cmpt13-file/file.component'



const routes: Routes = [


  {
    path: 'file/:iduser',
    component: FileComponent
  },
    {
    path: 'curso/:idcurso',
    component: AsignatureComponent
  },
      {
    path: 'integers/:idcurso',
    component: UsersCurseComponent
  },
{
        path:'task/:idtask',
        component: TaskPreviewComponent
},
{
    path: 'theme/:idtheme',
    component: ThemePreviewComponent
},
    {
    path: 'unity/:idunity',
    component: UnityPreviewComponent
  },
  {
    path: 'tema/:idtheme/:idunity',
    component: TasksComponent
  },

  {
    path: 'user/:id',
    component: UserPreviewComponent
  },
  {
    path: 'user',
    component: LandComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: UserComponent
  },
  /*
  */
  {
    path: 'cursoup/:id',
    component: PhotoPreviewComponent
  },
  {
    path: '',
    component: PhotosListComponent
  },
  /*
  {
    path: '',
    redirectTo: '/photos',
    pathMatch: 'full'
  }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
