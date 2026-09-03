import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PlaceStorageService } from '@services/place/place-storage.service.api';
import { AuthService } from '@services/auth/auth.service.api';
import { AuthDialogComponent } from '@features/auth/authorize/authorize.component';
import { Place } from '@entities/business/place.type';

@Injectable()
export class WishlistButtonService {
    private storage = inject(PlaceStorageService);
    private authService = inject(AuthService);
    private dialog = inject(MatDialog);

    isSaved(placeId: string): boolean {
        if (!this.authService.isAuthenticated()) {
            return false;
        }

        return this.storage.getWishlist().some(p => p.id === placeId);
    }

    toggle(place: Place, event?: MouseEvent): void {
        event?.stopPropagation();

        if (!this.authService.isAuthenticated()) {
            this.dialog.open(AuthDialogComponent, {
                data: 'login'
            });
            return;
        }

        const current = this.storage.getWishlist();
        const exists = current.some(p => p.id === place.id);

        const updated = exists
            ? current.filter(p => p.id !== place.id)
            : [...current, place];

        this.storage.saveWishlist(updated);
    }
}
