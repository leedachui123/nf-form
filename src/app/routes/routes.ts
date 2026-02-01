import { Routes } from '@angular/router';

import { LayoutBasicComponent } from '../layout';
import { NfDesigner } from './nf-designer/nf-designer';

export const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    data: {},
    children: [
      { path: '', redirectTo: 'nf-designer', pathMatch: 'full' },
      {
        path: 'nf-designer',
        component: NfDesigner,
        data: {
          title: 'Nf表单设计器'
        }
      }
    ]
  },
  { path: 'exception', loadChildren: () => import('./exception/routes').then(m => m.routes) },
  { path: '**', redirectTo: 'exception/404' }
];
