import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorldPage } from './world.page';

const routes: Routes = [
  {
    path: 'world',
    component: WorldPage,
    children: [
      {
        path: 'world',
        children: [
          {
            path: '',
            loadChildren: './world-routing.module'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/world',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorldPageRoutingModule {}
