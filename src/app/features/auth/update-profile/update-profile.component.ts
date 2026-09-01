import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '@services/auth/auth.service.api';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
    selector: 'app-update-profile',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        InputComponent,
        ButtonComponent
    ],
    templateUrl: './update-profile.component.html',
    styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
    private authService = inject(AuthService);

    currentUser = this.authService.currentUser;

    isLoading = signal(false);
    successMessage = signal(false);
    errorMessage = signal<string | null>(null);

    profileForm = new FormGroup({
        email: new FormControl({ value: '', disabled: true }),
        displayName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        photoURL: new FormControl('', [Validators.pattern('https?://.+')])
    });

    constructor() {
        effect(() => {
            const user = this.currentUser();
            if (user) {
                this.profileForm.patchValue({
                    email: user.email || '',
                    displayName: user.displayName || '',
                    photoURL: user.photoURL || ''
                });
            }
        });
    }

    async onSubmit(): Promise<void> {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);
        this.successMessage.set(false);
        this.errorMessage.set(null);

        const { displayName, photoURL } = this.profileForm.getRawValue();

        try {
            await this.authService.updateUserProfile({
                displayName: displayName || '',
                photoURL: photoURL || ''
            });
            this.successMessage.set(true);
        } catch (err: unknown) {
            this.errorMessage.set('Не вдалося оновити профіль.');
            console.error(err);
        } finally {
            this.isLoading.set(false);
        }
    }
}
