import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonVariant } from '@entities/ui/button.type';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input() variant: ButtonVariant = 'primary';
    @Input() icon?: string;
    @Input() disabled = false;

    @Input()
    @HostBinding('class.full-width')
    fullWidth = false;

    @Input()
    @HostBinding('class.mobile-full-width')
    responsive = false;

    @Output() btnClick = new EventEmitter<MouseEvent>();
}