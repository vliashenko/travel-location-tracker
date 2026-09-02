import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPlacesComponent } from '@features/place/search/search.component';
import { PlaceDetailsComponent } from '@features/place/view-details/details.component';
import { PlacesListComponent } from '@features/place/view-list/places-list.component';
import { Place } from '@entities/business/place.type';

@Component({
  selector: 'app-tracker-page',
  standalone: true,
  imports: [
    CommonModule,
    SearchPlacesComponent,
    PlaceDetailsComponent,
    PlacesListComponent
  ],
  templateUrl: './tracker-page.component.html',
  styleUrl: './tracker-page.component.scss'
})
export class TrackerPageComponent {
  places = signal<Place[]>([]);
  selectedPlace = signal<Place | null>(null);
  isLoading = signal<boolean>(false);

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
}