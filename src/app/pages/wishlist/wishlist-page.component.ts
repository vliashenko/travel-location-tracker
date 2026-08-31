import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from '@shared/components/card/card.component';
import { PlaceStorageService } from '@services/place/place-storage.service.api';
import { Place } from '@entities/business/place.type';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss'
})
export class WishlistPageComponent {
  private storageService = inject(PlaceStorageService);

  savedPlaces = signal<Place[]>(this.storageService.getWishlist());
  selectedPlace = signal<Place | null>(this.savedPlaces()[0] || null);

  selectPlace(place: Place): void {
    this.selectedPlace.set(place);
  }

  toggleWishlist(place: Place): void {
    const updated = this.savedPlaces().filter(p => p.id !== place.id);
    this.storageService.saveWishlist(updated);
    this.savedPlaces.set(updated);

    if (this.selectedPlace()?.id === place.id) {
      this.selectedPlace.set(updated[0] || null);
    }
  }
}
