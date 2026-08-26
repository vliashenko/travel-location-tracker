export interface Place {
    id: string;
    name: string;
    rating?: number;
    reviewsCount?: number;
    type?: string;
    address?: string;
    imageUrl?: string;
    price?: string;
}

export interface CacheEntry<T> {
    timestamp: number;
    data: T;
}
