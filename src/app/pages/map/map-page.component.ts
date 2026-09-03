import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceApiService } from '@services/place/place.service.api';
import { Place } from '@entities/business/place.type';
import { SearchPlacesComponent } from '@features/place/search/search.component';
import { PlacesMapComponent } from '@features/place/map/place-map.component';
import { WishlistButtonComponent } from '@features/place/toggle-wishlist/wishlist-button.component';

export interface SearchEventPayload {
  query: string;
  location?: string;
}

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchPlacesComponent,
    PlacesMapComponent,
    WishlistButtonComponent
  ],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss'
})
export class MapPageComponent implements OnInit {
  private placeApiService = inject(PlaceApiService);

  places = signal<Place[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.onSearch({ query: 'Tourist Attractions', location: 'Paris' });
  }

  onSearch(event: SearchEventPayload | any): void {
    const payload = event as SearchEventPayload;
    if (!payload?.query) return;

    this.isLoading.set(true);

    this.placeApiService.fetchPlaces(payload.query, payload.location ?? '').subscribe({
      next: (data) => {
        this.places.set(data ?? []);
        this.isLoading.set(false);
      },
      error: () => {
        this.places.set([]);
        this.isLoading.set(false);
      }
    });
  }
}