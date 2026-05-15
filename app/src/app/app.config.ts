import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/styled';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

// Linear-style minimal preset: cool blue primary, neutral grayscale surfaces.
const Linear = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    colorScheme: {
      light: {
        primary: {
          color:           '#3b82f6',
          contrastColor:   '#ffffff',
          hoverColor:      '#2563eb',
          activeColor:     '#1d4ed8'
        },
        highlight: {
          background:      'rgba(59, 130, 246, 0.10)',
          focusBackground: 'rgba(59, 130, 246, 0.18)',
          color:           '#2563eb',
          focusColor:      '#1d4ed8'
        },
        surface: {
          0:   '#ffffff',
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#ebebed',
          300: '#dedee0',
          400: '#a1a1a6',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b'
        }
      },
      dark: {
        primary: {
          color:           '#60a5fa',
          contrastColor:   '#0b0b0d',
          hoverColor:      '#93c5fd',
          activeColor:     '#bfdbfe'
        },
        highlight: {
          background:      'rgba(96, 165, 250, 0.14)',
          focusBackground: 'rgba(96, 165, 250, 0.24)',
          color:           '#bfdbfe',
          focusColor:      '#dbeafe'
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })
    ),
    provideHttpClient(withFetch()),
    providePrimeNG({
      theme: {
        preset: Linear,
        options: {
          darkModeSelector: '[data-theme="dark"]',
          cssLayer: { name: 'primeng', order: 'primeng' }
        }
      }
    })
  ]
};
