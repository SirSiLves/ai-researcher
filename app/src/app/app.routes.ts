import { Routes } from '@angular/router';

/**
 * Four-page red thread:
 *   /pulse     — what's happening now (today's radar + what changed)
 *   /momentum  — how it's moving (7d / 30d / 90d trend)
 *   /map       — what the landscape looks like (sectors × topics × firms)
 *   /archive   — everything published, faceted by cadence + date
 *
 * Detail routes hang off these as siblings (topic, story, firm).
 * Legacy paths redirect into the new shell.
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pulse' },

  // ── 1. PULSE ────────────────────────────────────────────────
  {
    path: 'pulse',
    loadComponent: () => import('./pages/today/today').then(m => m.TodayPage),
    data: { label: 'Pulse' }
  },
  {
    path: 'pulse/:date',
    loadComponent: () => import('./pages/today/today').then(m => m.TodayPage),
    data: { label: 'Pulse' }
  },

  // ── 2. MOMENTUM ─────────────────────────────────────────────
  {
    path: 'momentum',
    loadComponent: () => import('./pages/momentum/momentum').then(m => m.MomentumPage),
    data: { label: 'Momentum' }
  },
  {
    path: 'momentum/:window',
    loadComponent: () => import('./pages/momentum/momentum').then(m => m.MomentumPage),
    data: { label: 'Momentum' }
  },

  // ── 3. MAP ──────────────────────────────────────────────────
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map').then(m => m.MapPage),
    data: { label: 'Map' }
  },
  {
    path: 'map/topic/:id',
    loadComponent: () => import('./pages/topic/topic').then(m => m.TopicPage),
    data: { label: 'Topic' }
  },
  {
    path: 'map/firm/:slug',
    loadComponent: () => import('./pages/firm/firm').then(m => m.FirmPage),
    data: { label: 'Firm' }
  },
  {
    path: 'map/story/:id',
    loadComponent: () => import('./pages/story/story').then(m => m.StoryPage),
    data: { label: 'Story' }
  },
  {
    path: 'map/at/:date',
    loadComponent: () => import('./pages/map/map').then(m => m.MapPage),
    data: { label: 'Map' }
  },

  // ── 4. ARCHIVE ──────────────────────────────────────────────
  {
    path: 'archive',
    loadComponent: () => import('./pages/archive/archive').then(m => m.ArchivePage),
    data: { label: 'Archive' }
  },

  // ── 5. TRENDS — long-arc ledger (data/trends.md) ───────────
  {
    path: 'trends',
    loadComponent: () => import('./pages/trends/trends').then(m => m.TrendsPage),
    data: { label: 'Trends' }
  },

  // ── Legacy redirects ────────────────────────────────────────
  { path: 'today',          redirectTo: 'pulse' },
  { path: 'today/:date',    redirectTo: 'pulse/:date' },
  { path: 'priorities',     redirectTo: 'pulse' },
  { path: 'priorities/:date', redirectTo: 'pulse/:date' },
  { path: 'radar',          redirectTo: 'map' },
  { path: 'radar/:date',    redirectTo: 'map' },
  { path: 'radar/topic/:id', redirectTo: 'map/topic/:id' },
  { path: 'sectors',        redirectTo: 'map' },
  { path: 'sectors/:date',  redirectTo: 'map' },
  { path: 'firms',          redirectTo: 'map' },
  { path: 'firms/:slug',    redirectTo: 'map/firm/:slug' },
  { path: 'stories',        redirectTo: 'momentum' },
  { path: 'stories/:id',    redirectTo: 'map/story/:id' },
  { path: 'week',           redirectTo: 'momentum/7d' },
  { path: 'week/:id',       redirectTo: 'momentum/7d' },
  { path: 'month',          redirectTo: 'momentum/30d' },
  { path: 'month/:id',      redirectTo: 'momentum/30d' },
  { path: 'reports',        redirectTo: 'archive' },
  { path: 'library',        redirectTo: 'archive' },
  { path: 'sweeps',         redirectTo: 'archive' },

  { path: '**', redirectTo: 'pulse' }
];
