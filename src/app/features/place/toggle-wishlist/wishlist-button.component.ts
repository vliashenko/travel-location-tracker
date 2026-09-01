import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ButtonComponent } from '@shared/components/button/button.component';
import { PlaceStorageService } from '@services/place/place-storage.service.api';
import { AuthService } from '@services/auth/auth.service.api';
import { AuthDialogComponent } from '@features/auth/authorize/authorize.component';
import { Place } from '@entities/business/place.type';

@Component({
    selector: 'app-wishlist-button',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './wishlist-button.component.html',
    styleUrl: './wishlist-button.component.scss'
})
export class WishlistButtonComponent {
    private storage = inject(PlaceStorageService);
    private authService = inject(AuthService);
    private dialog = inject(MatDialog);

    place = input.required<Place>();

    isSaved(): boolean {
        if (!this.authService.isAuthenticated()) {
            return false;
        }

        return this.storage.getWishlist().some(p => p.id === this.place().id);
    }

    toggle(event?: MouseEvent): void {
        event?.stopPropagation();

        if (!this.authService.isAuthenticated()) {
            this.dialog.open(AuthDialogComponent, {
                data: 'login'
            });
            return;
        }

        const current = this.storage.getWishlist();
        const exists = current.some(p => p.id === this.place().id);

        const updated = exists
            ? current.filter(p => p.id !== this.place().id)
            : [...current, this.place()];

        this.storage.saveWishlist(updated);
    }
}
