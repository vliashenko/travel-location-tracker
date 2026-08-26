import { Injectable } from '@angular/core';
import { Place } from '@entities/business/place.type';

@Injectable({
    providedIn: 'root'
})
export class PlaceStorageService {
    private readonly STORAGE_KEY = 'user_wishlist';

    getWishlist(): Place[] {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (!raw) return [];
        try {
            return JSON.parse(raw) as Place[];
        } catch {
            return [];
        }
    }

    saveWishlist(places: Place[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(places));
    }
}
