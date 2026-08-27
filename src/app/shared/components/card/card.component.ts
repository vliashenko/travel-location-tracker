import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Place } from '@entities/business/place.type';
import { CardState } from '@entities/ui/card.type';
import { ChipComponent } from '../chip/chip.component';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule, ChipComponent, MatCardModule, MatButtonModule, MatIconModule, ButtonComponent],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
    place = input.required<Place>() ;
    state = input<CardState>({ isSelected: false, isSaved: false });

    selectCard = output<Place>();
    toggleWishlist = output<Place>();
}
