import { Component, model, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatIconModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss'
})
export class InputComponent {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() icon?: string;

    value = model<string>('');

    @Output() enterPressed = new EventEmitter<void>();
}
