import { Component, inject, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { Place } from '@entities/business/place.type';
import { SearchService } from './search.service';

@Component({
    selector: 'app-search-places',
    standalone: true,
    imports: [CommonModule, InputComponent, ButtonComponent],
    providers: [SearchService],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchPlacesComponent implements OnInit {
    private searchService = inject(SearchService);

    query = 'Tourist Attractions';
    location = 'Paris';
    isLoading = false;

    placesFound = output<Place[]>();
    loadingChanged = output<boolean>();

    ngOnInit(): void {
        this.onSearch();
    }

    onSearch(): void {
        this.setLoading(true);

        this.searchService.getPlaces(this.query, this.location).subscribe({
            next: (places) => {
                this.placesFound.emit(places);
                this.setLoading(false);
            },
            error: () => {
                this.setLoading(false);
            }
        });
    }

    private setLoading(state: boolean): void {
        this.isLoading = state;
        this.loadingChanged.emit(state);
    }
}
