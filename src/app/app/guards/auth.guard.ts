import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@services/auth/auth.service.api';
import { AuthDialogComponent } from '@features/auth/authorize/authorize.component';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const dialog = inject(MatDialog);

    if (authService.isAuthenticated()) {
        return true;
    }

    dialog.open(AuthDialogComponent);
    return router.createUrlTree(['/']);
};