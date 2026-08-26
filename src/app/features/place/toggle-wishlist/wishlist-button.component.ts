import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PlaceStorageService } from '@services/place/place-storage.service.api';
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

    @Input({ required: true }) place!: Place;

    isSaved(): boolean {
        return this.storage.getWishlist().some(p => p.id === this.place.id);
    }

    toggle(event?: MouseEvent): void {
        event?.stopPropagation();
        const current = this.storage.getWishlist();
        const exists = current.some(p => p.id === this.place.id);

        const updated = exists
            ? current.filter(p => p.id !== this.place.id)
            : [...current, this.place];

        this.storage.saveWishlist(updated);
    }
}
