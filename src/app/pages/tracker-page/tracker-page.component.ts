import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { SearchPlacesComponent } from '@features/place/search/search.component';
import { PlaceDetailsComponent } from '@features/place/view-details/details.component';
import { CardComponent } from '@shared/components/card/card.component';
import { PlaceStorageService } from '@services/place/place-storage.service.api';
import { AuthService } from '@services/auth/auth.service.api';
import { AuthDialogComponent } from '@features/auth/authorize/authorize.component';
import { Place } from '@entities/business/place.type';

@Component({
  selector: 'app-tracker-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchPlacesComponent,
    PlaceDetailsComponent,
    CardComponent
  ],
  templateUrl: './tracker-page.component.html',
  styleUrl: './tracker-page.component.scss'
})
export class TrackerPageComponent {
  private storageService = inject(PlaceStorageService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  places = signal<Place[]>([]);
  selectedPlace = signal<Place | null>(null);
  isLoading = signal<boolean>(false);

  wishlist = signal<Place[]>(this.storageService.getWishlist());

  onPlacesFound(results: Place[]): void {
    this.places.set(results);
    this.selectedPlace.set(results.length > 0 ? results[0] : null);
  }

  onLoadingChanged(loading: boolean): void {
    this.isLoading.set(loading);
  }

  selectPlace(place: Place): void {
    this.selectedPlace.set(place);
  }

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
