import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, tap, catchError } from 'rxjs';

import { PlaceApiService } from '@services/place/place.service.api';
import { PlaceCacheService } from '@services/place/place-cache.service.api';
import { Place } from '@entities/business/place.type';

@Injectable()
export class SearchService {
    private api = inject(PlaceApiService);
    private cache = inject(PlaceCacheService);
    private snackBar = inject(MatSnackBar);

    getPlaces(query: string, location: string): Observable<Place[]> {
        const searchQuery = query || 'Tourist Attractions';
        const searchLocation = location || 'Paris';

        const cached = this.cache.get(searchQuery, searchLocation);
        if (cached && cached.length > 0) {
            return of(cached);
        }

        return this.api.fetchPlaces(searchQuery, searchLocation).pipe(
            tap((places) => {
                if (places && places.length > 0) {
                    this.cache.set(searchQuery, searchLocation, places);
                }
            }),
            catchError((err) => {
                this.snackBar.open(
                    err?.message || 'Не вдалося отримати інформацію про місця від серверу',
                    'Закрити',
                    {
                        duration: 5000,
                        panelClass: ['error-snackbar'],
                        horizontalPosition: 'end',
                        verticalPosition: 'top'
                    }
                );
                return of([]);
            })
        );
    }
}
