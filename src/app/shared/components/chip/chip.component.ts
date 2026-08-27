import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-chip',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './chip.component.html',
    styleUrl: './chip.component.scss'
})
export class ChipComponent {
    label = input<string>('');
    icon = input<string>('');
}
