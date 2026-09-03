import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '@shared/components/button/button.component';
import { Place } from '@entities/business/place.type';
import { WishlistButtonService } from './wishlist-button.service';

@Component({
    selector: 'app-wishlist-button',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    providers: [WishlistButtonService],
    templateUrl: './wishlist-button.component.html',
    styleUrl: './wishlist-button.component.scss'
})
export class WishlistButtonComponent {
    private wishlistService = inject(WishlistButtonService);

    place = input.required<Place>();

    isSaved(): boolean {
        return this.wishlistService.isSaved(this.place().id);
    }

    toggle(event?: MouseEvent): void {
        this.wishlistService.toggle(this.place(), event);
    }
}
