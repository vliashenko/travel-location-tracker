import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '@environments/environment';
import { Place, SerpApiRawResult, SerpApiResponse, ReviewSnippet, GpsCoordinates } from '@entities/business/place.type';

@Injectable({
    providedIn: 'root'
})
export class PlaceApiService {
    private http = inject(HttpClient);

    fetchPlaces(query: string, location: string): Observable<Place[]> {
        const params = {
            engine: 'google_maps',
            q: `${query.trim()} ${location.trim()}`.trim(),
            type: 'search',
            api_key: environment.API_KEY
        };

        const requestUrl = environment.SERP_API_URL || '/api/serp/search.json';

        return this.http.get<SerpApiResponse>(requestUrl, { params }).pipe(
            map(res => {
                if (res.error) {
                    console.error('SerpApi Error:', res.error);
                    return [];
                }
                return this.transformResponse(res.local_results || []);
            }),
            catchError(err => {
                console.error('HTTP Request failed:', err);
                return of([]);
            })
        );
    }

    private transformResponse(results: SerpApiRawResult[]): Place[] {
        return results.map((item, index) => ({
            id: item.place_id || item.data_id || `place_${index}_${Date.now()}`,
            name: item.title || 'Untitled Place',
            rating: item.rating ?? 0,
            reviewsCount: item.reviews ?? 0,
            type: item.type || '',
            address: item.address || '',
            imageUrl: item.photos_link || item.thumbnail,
            price: item.price || '',
            phone: item.phone || '',
            website: item.website || '',
            description: item.description || item.snippet || '',
            reviewsList: this.mapReviews(item),
            coordinates: this.extractCoordinates(item)
        }));
    }

    private extractCoordinates(raw: SerpApiRawResult): GpsCoordinates | undefined {
        const lat = raw.gps_coordinates?.latitude ?? raw.latitude;
        const lng = raw.gps_coordinates?.longitude ?? raw.longitude;

        if (typeof lat === 'number' && typeof lng === 'number') {
            return { latitude: lat, longitude: lng };
        }

        return undefined;
    }

    private mapReviews(raw: any): ReviewSnippet[] | undefined {
        const reviewsSource = raw.reviews_list || raw.user_reviews;
        if (!Array.isArray(reviewsSource)) return undefined;

        return reviewsSource.map((rev: any) => ({
            author: rev.author_name || rev.author || 'Anonymous',
            rating: rev.rating || 0,
            text: rev.snippet || rev.text || '',
            date: rev.date
        }));
    }
}
