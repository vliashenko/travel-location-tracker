import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { CardComponent } from '@shared/components/card/card.component';
import { PlaceStorageService } from '@services/place/place-storage.service.api';
import { AuthService } from '@services/auth/auth.service.api';
import { AuthDialogComponent } from '@features/auth/authorize/authorize.component';
import { Place } from '@entities/business/place.type';

@Component({
    selector: 'app-places-list',
    standalone: true,
    imports: [CommonModule, CardComponent],
    templateUrl: './places-list.component.html',
    styleUrl: './places-list.component.scss'
})
export class PlacesListComponent {
    private storageService = inject(PlaceStorageService);
    private authService = inject(AuthService);
    private dialog = inject(MatDialog);

    places = input.required<Place[]>();
    selectedPlace = input<Place | null>(null);

    selectPlace = output<Place>();

    wishlist = signal<Place[]>(this.storageService.getWishlist());

    isSaved(place: Place): boolean {
        if (!this.authService.isAuthenticated()) {
            return false;
        }

        return this.wishlist().some(p => p.id === place.id);
    }

    toggleWishlist(place: Place): void {
        if (!this.authService.isAuthenticated()) {
            this.dialog.open(AuthDialogComponent, { data: 'login' });
            return;
        }

        const current = this.storageService.getWishlist();
        const exists = current.some(p => p.id === place.id);

        const updated = exists
            ? current.filter(p => p.id !== place.id)
            : [...current, place];

        this.storageService.saveWishlist(updated);
        this.wishlist.set(updated);
    }
}
