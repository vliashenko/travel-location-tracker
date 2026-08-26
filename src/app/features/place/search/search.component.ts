import { Component, inject, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PlaceApiService } from '@services/place/place.service.api';
import { PlaceCacheService } from '@services/place/place-cache.service.api';
import { Place } from '@entities/business/place.type';

@Component({
    selector: 'app-search-places',
    standalone: true,
    imports: [CommonModule, InputComponent, ButtonComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchPlacesComponent implements OnInit {
    private api = inject(PlaceApiService);
    private cache = inject(PlaceCacheService);

    query = 'Tourist Attractions';
    location = 'Paris';
    isLoading = false;

    @Output() placesFound = new EventEmitter<Place[]>();
    @Output() loadingChanged = new EventEmitter<boolean>();

    ngOnInit(): void {
        this.onSearch();
    }

    onSearch(): void {
        const searchQuery = (typeof this.query === 'function' ? (this.query as any)() : this.query) || 'Tourist Attractions';
        const searchLocation = (typeof this.location === 'function' ? (this.location as any)() : this.location) || 'Paris';

        this.isLoading = true;
        this.loadingChanged.emit(true);

        const cached = this.cache.get(searchQuery, searchLocation);
        if (cached && cached.length > 0) {
            this.placesFound.emit(cached);
            this.isLoading = false;
            this.loadingChanged.emit(false);
            return;
        }

        this.api.fetchPlaces(searchQuery, searchLocation).subscribe({
            next: (places) => {
                console.log('[SearchPlacesComponent] Fresh API Response:', places);
                if (places && places.length > 0) {
                    this.cache.set(searchQuery, searchLocation, places);
                }
                this.placesFound.emit(places);
                this.isLoading = false;
                this.loadingChanged.emit(false);
            },
            error: (err) => {
                console.error('[SearchPlacesComponent] API Error:', err);
                this.isLoading = false;
                this.loadingChanged.emit(false);
            }
        });
    }
}
