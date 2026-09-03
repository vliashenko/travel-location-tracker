import {
    Component,
    ElementRef,
    inject,
    input,
    signal,
    viewChild,
    AfterViewInit,
    OnDestroy,
    effect
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Place } from '@entities/business/place.type';
import { WishlistButtonComponent } from '@features/place/toggle-wishlist/wishlist-button.component';
import { PlacesMapService } from './place-map.service';

@Component({
    selector: 'app-places-map',
    standalone: true,
    imports: [CommonModule, WishlistButtonComponent],
    providers: [PlacesMapService],
    templateUrl: './place-map.component.html',
    styleUrl: './place-map.component.scss'
})
export class PlacesMapComponent implements AfterViewInit, OnDestroy {
    private mapService = inject(PlacesMapService);

    places = input.required<Place[]>();
    selectedPlace = signal<Place | null>(null);

    mapContainer = viewChild.required<ElementRef<HTMLDivElement>>('mapContainer');

    constructor() {
        effect(() => {
            const currentPlaces = this.places();
            this.mapService.renderMarkers(currentPlaces, (place) => {
                this.selectedPlace.set(place);
            });
        });
    }

    ngAfterViewInit(): void {
        this.mapService.initMap(this.mapContainer().nativeElement);
    }

    closeCard(): void {
        this.selectedPlace.set(null);
    }

    ngOnDestroy(): void {
        this.mapService.destroy();
    }
}
