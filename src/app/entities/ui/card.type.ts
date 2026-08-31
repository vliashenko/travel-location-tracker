export interface CardState {
    isSelected: boolean;
    isSaved: boolean;
}

export interface CardPlace {
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
    reviewsList?: {
        author: string;
        rating: number;
        text: string;
        date?: string;
    }[];
}
