import {
    Injectable,
    NgZone,
    inject,
    ApplicationRef,
    createComponent,
    EnvironmentInjector
} from '@angular/core';
import * as L from 'leaflet';
import { Place } from '@entities/business/place.type';
import { WishlistButtonComponent } from '@features/place/toggle-wishlist/wishlist-button.component';

@Injectable()
export class PlacesMapService {
    private ngZone = inject(NgZone);
    private appRef = inject(ApplicationRef);
    private injector = inject(EnvironmentInjector);

    private map?: L.Map;
    private markersGroup = L.layerGroup();

    private pendingPlaces: Place[] = [];
    private pendingOnSelect?: (place: Place) => void;

    initMap(container: HTMLElement): void {
        if (this.map) return;

        this.ngZone.runOutsideAngular(() => {
            this.map = L.map(container, {
                zoomControl: true,
                attributionControl: false
            }).setView([48.8566, 2.3522], 12);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19
            }).addTo(this.map);

            this.markersGroup.addTo(this.map);
        });

        this.invalidateSize();

        if (this.pendingPlaces.length && this.pendingOnSelect) {
            this.renderMarkers(this.pendingPlaces, this.pendingOnSelect);
        }
    }

    renderMarkers(places: Place[], onSelectPlace: (place: Place) => void): void {
        this.pendingPlaces = places ?? [];
        this.pendingOnSelect = onSelectPlace;

        if (!this.map) return;

        this.markersGroup.clearLayers();

        if (!places || places.length === 0) return;

        const validPlaces = places.filter((p) => {
            const lat = Number(p.coordinates?.latitude);
            const lng = Number(p.coordinates?.longitude);
            return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
        });

        if (validPlaces.length === 0) return;

        const bounds = L.latLngBounds([]);

        const pinIcon = L.divIcon({
            className: 'custom-map-pin',
            html: `<div style="
          background-color: #2563eb;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          cursor: pointer;
        "></div>`,
            iconSize: [18, 18],
            iconAnchor: [9, 9]
        });

        validPlaces.forEach((place) => {
            const lat = Number(place.coordinates!.latitude);
            const lng = Number(place.coordinates!.longitude);
            const latLng: L.LatLngExpression = [lat, lng];

            const marker = L.marker(latLng, { icon: pinIcon });

            const popupContent = document.createElement('div');
            popupContent.className = 'map-popup-card';
            popupContent.innerHTML = `
          ${place.imageUrl ? `<img src="${place.imageUrl || '/public/placeholder.jpg'}" alt="${place.name}" class="popup-img" />` : ''}
          <div class="popup-info">
            <div class="popup-header">
              <h4 class="popup-title">${place.name}</h4>
              <div class="wishlist-slot"></div>
            </div>
            ${place.address ? `<p class="popup-address">${place.address}</p>` : ''}
            ${place.rating ? `<div class="popup-rating">⭐ ${place.rating}</div>` : ''}
          </div>
        `;

            const wishlistSlot = popupContent.querySelector('.wishlist-slot');
            if (wishlistSlot) {
                const wishlistComponentRef = createComponent(WishlistButtonComponent, {
                    environmentInjector: this.injector
                });

                wishlistComponentRef.setInput('place', place);
                this.appRef.attachView(wishlistComponentRef.hostView);
                wishlistSlot.appendChild(wishlistComponentRef.location.nativeElement);
            }

            marker.bindPopup(popupContent, {
                className: 'custom-leaflet-popup',
                closeButton: false,
                offset: [0, -10]
            });

            marker.on('mouseover', () => {
                marker.openPopup();
            });

            marker.on('click', () => {
                this.ngZone.run(() => onSelectPlace(place));
            });

            this.markersGroup.addLayer(marker);
            bounds.extend(latLng);
        });

        this.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        this.invalidateSize();
    }

    invalidateSize(): void {
        if (!this.map) return;
        setTimeout(() => {
            this.map?.invalidateSize();
        }, 100);
    }

    destroy(): void {
        if (this.map) {
            this.map.remove();
            this.map = undefined;
        }
    }
}
