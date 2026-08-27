export interface SerpApiRawResult {
    data_id?: string;
    place_id?: string;
    title?: string;
    rating?: number;
    reviews?: number;
    type?: string;
    address?: string;
    thumbnail?: string;
    price?: string;
    phone?: string;
    website?: string;
    operating_hours?: { [key: string]: string };
    description?: string;
    snippet?: string;
    photos_link?: string;
}

export interface SerpApiResponse {
    local_results?: SerpApiRawResult[];
    error?: string;
}

export interface ReviewSnippet {
    author: string;
    rating: number;
    text: string;
    date?: string;
}

export interface Place {
    id: string;
    name: string;
    rating?: number;
    reviewsCount?: number;
    type?: string;
    address?: string;
    imageUrl?: string;
    price?: string;
    phone?: string;
    website?: string;
    isOpenNow?: boolean;
    description?: string;
    reviewsList?: ReviewSnippet[];
}

export interface CacheEntry<T> {
    timestamp: number;
    data: T;
}