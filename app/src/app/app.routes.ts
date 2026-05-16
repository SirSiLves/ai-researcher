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
    path: 'archive',
    loadComponent: () => import('./pages/archive/archive').then(m => m.ArchivePage),
    data: { label: 'Archive' }
  },
  {
    path: 'week',
    loadComponent: () => import('./pages/week/week').then(m => m.WeekPage),
    data: { label: 'Week' }
  },
  {
    path: 'week/:id',
    loadComponent: () => import('./pages/week/week').then(m => m.WeekPage),
    data: { label: 'Week' }
  },
  {
    path: 'month',
    loadComponent: () => import('./pages/month/month').then(m => m.MonthPage),
    data: { label: 'Month' }
  },
  {
    path: 'month/:id',
    loadComponent: () => import('./pages/month/month').then(m => m.MonthPage),
    data: { label: 'Month' }
  },

  {
    path: 'stories',
    loadComponent: () => import('./pages/stories/stories').then(m => m.StoriesPage),
    data: { label: 'Stories' }
  },
  {
    path: 'stories/:id',
    loadComponent: () => import('./pages/story/story').then(m => m.StoryPage),
    data: { label: 'Story' }
  },

  { path: 'trends', pathMatch: 'full', redirectTo: 'radar' },

  {
    path: 'radar',
    loadComponent: () => import('./pages/trends/trends').then(m => m.TrendsPage),
    data: { label: 'Radar' }
  },
  {
    path: 'radar/topic/:id',
    loadComponent: () => import('./pages/topic/topic').then(m => m.TopicPage),
    data: { label: 'Topic' }
  },
  {
    path: 'radar/:date',
    loadComponent: () => import('./pages/trends/trends').then(m => m.TrendsPage),
    data: { label: 'Radar' }
  },

  {
    path: 'sectors',
    loadComponent: () => import('./pages/sectors/sectors').then(m => m.SectorsPage),
    data: { label: 'Sectors' }
  },
  {
    path: 'sectors/:date',
    loadComponent: () => import('./pages/sectors/sectors').then(m => m.SectorsPage),
    data: { label: 'Sectors' }
  },

  {
    path: 'movements',
    loadComponent: () => import('./pages/movements/movements').then(m => m.MovementsPage),
    data: { label: 'Movements' }
  },
  {
    path: 'movements/:date',
    loadComponent: () => import('./pages/movements/movements').then(m => m.MovementsPage),
    data: { label: 'Movements' }
  },

  {
    path: 'firms',
    loadComponent: () => import('./pages/firms/firms').then(m => m.FirmsPage),
    data: { label: 'Firms' }
  },
  {
    path: 'firms/:slug',
    loadComponent: () => import('./pages/firm/firm').then(m => m.FirmPage),
    data: { label: 'Firm' }
  },

  {
    path: 'sweeps',
    loadComponent: () => import('./pages/sweeps/sweeps').then(m => m.SweepsPage),
    data: { label: 'Sweeps' }
  },

  { path: 'reports', pathMatch: 'full', redirectTo: 'library' },

  {
    path: 'library',
    loadComponent: () => import('./pages/reports/reports').then(m => m.ReportsPage),
    data: { label: 'Library' }
  },

  { path: '**', redirectTo: 'today' }
];
