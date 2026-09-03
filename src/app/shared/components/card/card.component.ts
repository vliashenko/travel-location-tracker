import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardPlace } from '@entities/ui/card.type';
import { CardState } from '@entities/ui/card.type';
import { ChipComponent } from '@shared/components/chip/chip.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DefaultValuePipe } from '@shared/pipes/default-value.pipe';
import { FallbackImagePipe } from '@shared/pipes/fallback-image.pipe';
import { CompactNumberPipe } from '@shared/pipes/compact-number.pipe';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        CommonModule,
        ChipComponent,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        ButtonComponent,
        DefaultValuePipe,
        FallbackImagePipe,
        CompactNumberPipe
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
    place = input.required<CardPlace>();
    state = input<CardState>({ isSelected: false, isSaved: false });

    selectCard = output<CardPlace>();
    toggleWishlist = output<CardPlace>();
}
