import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistButtonComponent } from '../toggle-wishlist/wishlist-button.component';
import { ChipComponent } from '@shared/components/chip/chip.component';
import { Place } from '@entities/business/place.type';

@Component({
    selector: 'app-place-details',
    standalone: true,
    imports: [CommonModule, WishlistButtonComponent, ChipComponent],
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss'
})
export class PlaceDetailsComponent {
    @Input() place: Place | null = null;
}
