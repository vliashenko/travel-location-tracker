import { Injectable } from '@angular/core';
import { Place, CacheEntry } from '@entities/business/place.type';

@Injectable({
    providedIn: 'root'
})
export class PlaceCacheService {
    private readonly CACHE_TTL_MS = 10 * 60 * 1000;
    private cache = new Map<string, CacheEntry<Place[]>>();

    get(query: string, location: string): Place[] | null {
        const key = this.generateKey(query, location);

        let cached = this.cache.get(key);

        if (!cached) {
            const stored = sessionStorage.getItem(`cache_${key}`);
            if (stored) {
                cached = JSON.parse(stored);
            }
        }

        if (cached && (Date.now() - cached.timestamp < this.CACHE_TTL_MS)) {
            return cached.data;
        }

        this.cache.delete(key);
        sessionStorage.removeItem(`cache_${key}`);
        return null;
    }

    set(query: string, location: string, data: Place[]): void {
        const key = this.generateKey(query, location);
        const entry: CacheEntry<Place[]> = {
            timestamp: Date.now(),
            data
        };

        this.cache.set(key, entry);
        sessionStorage.setItem(`cache_${key}`, JSON.stringify(entry));
    }

    private generateKey(query: string, location: string): string {
        return `${query.toLowerCase().trim()}_${location.toLowerCase().trim()}`;
    }
}
