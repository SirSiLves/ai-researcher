import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'today' },
  {
    path: 'today',
    loadComponent: () => import('./pages/today/today').then(m => m.TodayPage),
    data: { label: 'Today' }
  },
  {
    path: 'today/:date',
    loadComponent: () => import('./pages/today/today').then(m => m.TodayPage),
    data: { label: 'Today' }
  },
  {
    path: 'trends',
    loadComponent: () => import('./pages/trends/trends').then(m => m.TrendsPage),
    data: { label: 'Trends' }
  },
  {
    path: 'firms',
    loadComponent: () => import('./pages/firms/firms').then(m => m.FirmsPage),
    data: { label: 'Firms' }
  },
  {
    path: 'firms/:slug',
    loadComponent: () => import('./pages/firms/firms').then(m => m.FirmsPage),
    data: { label: 'Firms' }
  },
  {
    path: 'reports',
    loadComponent: () => import('./pages/reports/reports').then(m => m.ReportsPage),
    data: { label: 'Reports' }
  },
  { path: '**', redirectTo: 'today' }
];
