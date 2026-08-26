import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPlacesComponent } from '@features/place/search/search.component';
import { PlaceDetailsComponent } from '@features/place/view-details/details.component';
import { CardComponent } from '@shared/components/card/card.component';
import { PlaceStorageService } from '@services/place/place-storage.service.api';
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

    places: Place[] = [];
    selectedPlace: Place | null = null;
    isLoading = false;

    onPlacesFound(results: Place[]): void {
        this.places = results;
        this.selectedPlace = results.length > 0 ? results[0] : null;
    }

    onLoadingChanged(loading: boolean): void {
        this.isLoading = loading;
    }

    selectPlace(place: Place): void {
        this.selectedPlace = place;
    }

    isSaved(place: Place): boolean {
        return this.storageService.getWishlist().some(p => p.id === place.id);
    }

    toggleWishlist(place: Place): void {
        const current = this.storageService.getWishlist();
        const exists = current.some(p => p.id === place.id);

        const updated = exists
            ? current.filter(p => p.id !== place.id)
            : [...current, place];

        this.storageService.saveWishlist(updated);
    }
}
