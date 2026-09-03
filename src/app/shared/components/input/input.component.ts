import { Component, input, output, forwardRef, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor {
    label = input.required<string>();
    placeholder = input.required<string>();
    icon = input<string>();

    value = model<string>('');
    disabled = model<boolean>(false);

    enterPressed = output<void>();

    private onChange: (val: string) => void = () => { };
    private onTouched: () => void = () => { };

    writeValue(val: string): void {
        this.value.set(val || '');
    }

    registerOnChange(fn: (val: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled.set(isDisabled);
    }

    onInput(event: Event): void {
        const val = (event.target as HTMLInputElement).value;
        this.value.set(val);
        this.onChange(val);
    }

    onBlur(): void {
        this.onTouched();
    }
}