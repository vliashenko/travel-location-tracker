import { Routes } from '@angular/router';
import { authGuard } from './app/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tracker',
        pathMatch: 'full'
    },
    {
        path: 'tracker',
        loadComponent: () => import('./pages/tracker-page/tracker-page.component').then(m => m.TrackerPageComponent)
    },
    {
        path: 'wishlist',
        loadComponent: () => import('./pages/wishlist/wishlist-page.component').then(m => m.WishlistPageComponent),
        canActivate: [authGuard],
    },
    {
        path: '**',
        redirectTo: 'tracker'
    }
];