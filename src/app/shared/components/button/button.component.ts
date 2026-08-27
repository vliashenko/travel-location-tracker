import { Component, Input, HostBinding, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
    variant = input<string>('primary') ;
    icon = input<string | undefined>();
    disabled = input<boolean>(false);

    @Input()
    @HostBinding('class.full-width')
    fullWidth = false;

    @Input()
    @HostBinding('class.mobile-full-width')
    responsive = false;

    btnClick = output<MouseEvent>();
}